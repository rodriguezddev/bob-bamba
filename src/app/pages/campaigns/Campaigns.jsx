import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  Box, Grid, IconButton, Tooltip, Typography,
} from '@mui/material'
import { CSVLink } from 'react-csv'
import { useForm } from 'react-hook-form'
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import SimCardDownloadIcon from '@mui/icons-material/SimCardDownload'
import { format } from 'date-fns'
import { GeneralTitle } from '../../components/texts'
import DeleteIcon from '../../assets/images/icons/delete.svg'
import { GeneralTable, TableCell, TableRow } from '../../components/tables'
import { columns } from './components/columns'
import { MainButton } from '../../components/buttons'
import { MainFilter } from '../../components/filters'
import { filters } from './components/filters'
import {
  deleteCampaign,
  getCampaign,
  getCampaigns,
  resetUploadUsersCampaigns,
  updateCampaign,
  assignUsers,
  resetCampaign,
} from '../../slices/campaigns/campaignsSlice'
import { ActionAlert, Alert } from '../../components/modals'
import useRowsPerPage from '../../hooks/useRowsPerPage'
import { handleSentCampaign } from '../../utils/UtilsTranslate'
import AssignUsersContainer from './components/assignUsersContainer/AssignUsersContainer'
import CampaignsForm from './components/campaignsForm'

const Campaigns = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const campaignsForm = useForm({
    defaultValues: {
      infoTemplate: '',
      send_date: '',
      accountName: '',
      template_lang: '',
      template: '',
      partnerId: '',
    },
  })
  const { handleSubmit, reset } = campaignsForm
  const [page, setPage] = useState(0)
  const [search, setSearch] = useState('')
  const { campaigns, campaign, isUploadUsersCampaigns } = useSelector(
    (state) => state.campaign,
  )
  const [campaignsAlert, setCampaignsAlert] = useState({})
  const [dataUpdateCampaign, setDataUpdateCampaign] = useState({})
  const [isShowDeleteAlert, setIsShowDeleteAlert] = useState(false)
  const [isShowUpdateAlert, setIsShowUpdateAlert] = useState(false)
  const [isShowConfirmAlert, setIsShowConfirmAlert] = useState(false)
  const [isShowDownloadAlert, setIsShowDownloadAlert] = useState(false)
  const [isShowAssignUsersAlert, setIsShowAssignUsersAlert] = useState(false)
  const [isOpenUsersSuccessAlert, setIsOpenUsersSuccessAlert] = useState(false)
  const [userFile, setUserFile] = useState('')
  const { rowsPerPage, handleChangeRowsPerPage } = useRowsPerPage(getCampaigns)

  useEffect(() => {
    dispatch(getCampaigns())
  }, [])

  const onSubmit = (dataForm) => {
    const [template, language] = dataForm.infoTemplate.split(' ')
    const data = {
      send_date: format(dataForm.send_date, 'yyyy-MM-dd HH:mm'),
      notice_account_id: dataForm.accountId,
      template_lang: language,
      template,
    }

    setDataUpdateCampaign(data)
    setIsShowConfirmAlert(true)
    setIsShowUpdateAlert(false)
    dispatch(resetCampaign())
  }

  const handleAssignUsers = (dataForm) => {
    const data = new FormData()
    data.append('users_file', userFile)
    data.append('partner_id', dataForm.partnerId)

    dispatch(assignUsers({ data, campaignId: campaignsAlert.id }))
    setIsShowAssignUsersAlert(false)
    dispatch(resetCampaign())
  }

  const handleUpdateCampaign = () => {
    dispatch(
      updateCampaign({
        data: dataUpdateCampaign,
        campaignId: campaignsAlert.id,
      }),
    )

    setIsShowConfirmAlert(false)
    reset({
      infoTemplate: '',
      send_date: '',
      accountName: '',
      template_lang: '',
      template: '',
    })
  }

  const handleSearch = (path) => {
    setSearch(path)
    dispatch(getCampaigns(path))
  }

  const onPageChange = (event, newPage) => {
    dispatch(
      getCampaigns(
        `${search ? `${search}&` : `?limit=${rowsPerPage}&`}page=${
          newPage + 1
        }`,
      ),
    )
    setPage(newPage)
  }

  const navigateToCreateUser = () => {
    navigate('/campaigns/create')
  }

  const handleDeleteAlert = () => {
    dispatch(deleteCampaign(campaignsAlert.id))
    setIsShowDeleteAlert(false)
  }

  const handleActionsCampaigns = (campaignsData, value = 'delete') => {
    setCampaignsAlert(campaignsData)

    if (value === 'update') {
      setIsShowUpdateAlert(true)
      return
    }

    if (value === 'assign') {
      setIsShowAssignUsersAlert(true)
      return
    }

    setIsShowDeleteAlert(true)
  }

  const handleCampaigns = (campaignId) => {
    dispatch(getCampaign(campaignId))
    setIsShowDownloadAlert(true)
  }

  const handleUsersCampaigns = (campaignUsers) => {
    const newUsers = campaignUsers.map((campaignUser) => {
      const {
        id, subscriptions, metadata, ...rest
      } = campaignUser

      return rest
    })

    return newUsers
  }

  useEffect(() => {
    if (isUploadUsersCampaigns) {
      setIsOpenUsersSuccessAlert(isUploadUsersCampaigns)
    }
  }, [isUploadUsersCampaigns])

  useEffect(() => {
    if (!isOpenUsersSuccessAlert) {
      dispatch(resetUploadUsersCampaigns())
    }
  }, [isOpenUsersSuccessAlert])

  return (
    <Box sx={{ width: '100%' }}>
      <Box display='flex' my={4} sx={{ justifyContent: 'space-between' }}>
        <GeneralTitle text='Campañas' />
        <MainButton
          color='primary'
          data-testid='button-create-campaigns'
          fontSize='0.85rem'
          height='3rem'
          onClick={navigateToCreateUser}
          radius='0.62rem'
          width='15rem'
        >
          Crear campaña
        </MainButton>
      </Box>
      <MainFilter fieldDetails={filters} handleSearch={handleSearch} />
      <GeneralTable
        columns={columns}
        count={campaigns?.meta?.total ?? 0}
        onPageChange={onPageChange}
        onRowsPerPageChange={handleChangeRowsPerPage}
        page={page}
        rowsPerPage={rowsPerPage}
        SelectProps={{
          native: true,
        }}
      >
        {campaigns?.data?.map((campaignInfo) => (
          <TableRow key={campaignInfo.id}>
            <TableCell align='left'>
              {campaignInfo?.notice_account.name?.replace(/_/g, ' ')}
            </TableCell>
            <TableCell align='left'>{campaignInfo?.send_date}</TableCell>
            <TableCell align='left'>
              {campaignInfo?.template?.replace(/_/g, ' ')}
            </TableCell>
            <TableCell align='center'>
              {campaignInfo?.template_lang?.replace(/_/g, ' ')}
            </TableCell>
            <TableCell align='center'>
              {handleSentCampaign(campaignInfo?.sent)}
            </TableCell>
            <TableCell align='center'>
              <Grid alignItems='center' container direction='row' spacing={1}>
                <Grid item>
                  <Tooltip title='Eliminar campaña'>
                    <IconButton
                      onClick={() => handleActionsCampaigns(campaignInfo)}
                      sx={{ padding: 0 }}
                    >
                      <img
                        alt='delete'
                        height={20}
                        src={DeleteIcon}
                        width={20}
                      />
                    </IconButton>
                  </Tooltip>
                </Grid>
                <Grid
                  item
                  onClick={() => handleActionsCampaigns(campaignInfo, 'update')}
                >
                  <Tooltip title='Actualizar campaña'>
                    <IconButton color='primary' sx={{ padding: 0 }}>
                      <BorderColorIcon sx={{ fontSize: '1.25rem' }} />
                    </IconButton>
                  </Tooltip>
                </Grid>
                <Grid
                  item
                  onClick={() => handleActionsCampaigns(campaignInfo, 'assign')}
                >
                  <Tooltip title='Asignar usuarios'>
                    <IconButton color='primary' sx={{ padding: 0 }}>
                      <GroupAddIcon sx={{ fontSize: '1.25rem' }} />
                    </IconButton>
                  </Tooltip>
                </Grid>
                <Grid item>
                  <Tooltip title='Descargar archivo de usuarios asociados'>
                    <IconButton
                      onClick={() => handleCampaigns(campaignInfo.id)}
                      sx={{ padding: 0 }}
                    >
                      <SimCardDownloadIcon
                        color='primary'
                        sx={{ fontSize: '1.25rem' }}
                      />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
            </TableCell>
          </TableRow>
        ))}
      </GeneralTable>
      {isShowDeleteAlert && (
        <Alert
          actionButton={handleDeleteAlert}
          alertContentText='La información se eliminará permanentemente'
          alertTextButton='Cancelar'
          alertTitle='¿Quieres eliminar esta campaña?'
          isShowPrimaryButton
          isOpen={isShowDeleteAlert}
          setIsOpen={setIsShowDeleteAlert}
        />
      )}
      {isShowUpdateAlert && (
        <ActionAlert
          actionAlertContentText='Al editar la campaña se restablecerán los usuarios'
          actionAlertTextButton='Cerrar'
          actionAlertTitle='Actualizar campaña'
          isOpen={isShowUpdateAlert}
          isShowPrimaryButton
          onClick={handleSubmit(onSubmit)}
          primaryButtonTextAlert='Actualizar'
          setActionsIsOpen={setIsShowUpdateAlert}
        >
          <CampaignsForm
            campaignsForm={campaignsForm}
            isShowConfirmAlert={isShowConfirmAlert}
            setIsShowUpdateAlert={setIsShowUpdateAlert}
          />
        </ActionAlert>
      )}
      {isShowAssignUsersAlert && (
        <ActionAlert
          actionAlertContentText=''
          actionAlertTextButton='Cerrar'
          actionAlertTitle='Asignar usuarios a esta campaña'
          isOpen={isShowAssignUsersAlert}
          isShowPrimaryButton
          maxWidth='sm'
          onClick={handleSubmit(handleAssignUsers)}
          primaryButtonTextAlert='Actualizar'
          setActionsIsOpen={setIsShowAssignUsersAlert}
        >
          <AssignUsersContainer
            assignUsers={campaignsForm}
            setUserFile={setUserFile}
          />
        </ActionAlert>
      )}
      {isShowConfirmAlert && (
        <Alert
          actionButton={handleUpdateCampaign}
          alertContentText='Los datos de esta campaña se sobre escribirán'
          alertTextButton='Cancelar'
          alertTitle='¿Quieres actualizar esta campaña?'
          isShowPrimaryButton
          isOpen={isShowConfirmAlert}
          primaryButtonTextAlert='Confirmar'
          setIsOpen={setIsShowConfirmAlert}
        />
      )}
      {isShowDownloadAlert && (
        <Alert
          alertContentText={
            !campaign?.users || campaign?.users?.length === 0 ? (
              <Box align='center'>Esta campaña no tiene usuarios asignados</Box>
            ) : (
              <CSVLink
                data={handleUsersCampaigns(campaign?.users)}
                filename='user-campaigns-assigned.csv'
              >
                <Box alignItems='center' display='flex' flexDirection='column'>
                  <Typography mt={1} variant='caption'>
                    Click aquí
                  </Typography>
                </Box>
              </CSVLink>
            )
          }
          alertTextButton='Cerrar'
          alertTitle='Descargar usuarios asignados'
          isOpen={isShowDownloadAlert}
          setIsOpen={setIsShowDownloadAlert}
        />
      )}
    </Box>
  )
}

export default Campaigns
