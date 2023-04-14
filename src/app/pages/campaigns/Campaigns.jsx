import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  Box, Grid, IconButton, Tooltip,
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
  getCampaigns,
  resetDeleteCampaigns,
  updateCampaign,
} from '../../slices/campaigns/campaignsSlice'
import { ActionAlert, Alert } from '../../components/modals'
import CampaignsForm from './components/CampaignsForm'
import UploadUsersCampaignIconButton from './components/UploadUsersCampaignIconButton'
import useRowsPerPage from '../../hooks/useRowsPerPage'

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
    },
  })
  const { handleSubmit, reset } = campaignsForm
  const [page, setPage] = useState(0)
  const [search, setSearch] = useState('')
  const { campaigns } = useSelector((state) => state.campaign)
  const [campaignsAlert, setCampaignsAlert] = useState({})
  const [dataUpdateCampaign, setDataUpdateCampaign] = useState({})
  const [isShowDeleteAlert, setIsShowDeleteAlert] = useState(false)
  const [isShowUpdateAlert, setIsShowUpdateAlert] = useState(false)
  const [isShowSuccessAlert, setIsShowSuccessAlert] = useState(false)
  const [isShowConfirmAlert, setIsShowConfirmAlert] = useState(false)
  const { rowsPerPage, handleChangeRowsPerPage } = useRowsPerPage(getCampaigns)

  useEffect(() => {
    dispatch(getCampaigns())
  }, [])

  const onSubmit = (dataForm) => {
    const [template, language] = dataForm.infoTemplate.split(' ')
    const data = {
      send_date: format(dataForm.send_date, 'yyyy-MM-dd HH:mm'),
      account_name: dataForm.accountName,
      template_lang: language,
      template,
    }

    setDataUpdateCampaign(data)
    setIsShowConfirmAlert(true)
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

    setIsShowDeleteAlert(true)
  }

  const handleUsersCampaigns = (campaignUsers) => {
    const newUsers = campaignUsers.map((item) => {
      const { subscriptions, ...rest } = item

      return rest
    })

    return newUsers
  }

  useEffect(() => {
    if (campaigns.deleteCampaign?.isSuccess) {
      setIsShowSuccessAlert(campaigns.deleteCampaign?.isSuccess)
      dispatch(resetDeleteCampaigns())
    }
  }, [campaigns])

  return (
    <Box sx={{ width: '100%' }}>
      <Box display='flex' my={4} sx={{ justifyContent: 'space-between' }}>
        <GeneralTitle text='Campañas' />
        <MainButton
          color='primary'
          data-testid='button-create-campaigns'
          fontSize='1rem'
          height='3.75rem'
          onClick={navigateToCreateUser}
          radius='0.62rem'
          width='18rem'
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
        {campaigns?.data?.map((campaign) => (
          <TableRow key={campaign.id}>
            <TableCell align='left'>
              {campaign?.account_name?.replace(/_/g, ' ')}
            </TableCell>
            <TableCell align='left'>{campaign?.send_date}</TableCell>
            <TableCell align='left'>
              {campaign?.template?.replace(/_/g, ' ')}
            </TableCell>
            <TableCell align='center'>
              {campaign?.template_lang?.replace(/_/g, ' ')}
            </TableCell>
            {!campaign?.users || campaign?.users?.length === 0 ? (
              <TableCell align='center'>-</TableCell>
            ) : (
              <TableCell align='center'>
                <CSVLink
                  data={handleUsersCampaigns(campaign?.users)}
                  filename='user-campaigns-assigned.csv'
                >
                  <Tooltip title='Descargar archivo de usuarios asociados'>
                    <SimCardDownloadIcon color='primary' />
                  </Tooltip>
                </CSVLink>
              </TableCell>
            )}
            <TableCell align='center'>
              {campaign?.sent ? 'Enviada' : 'Pendiente'}
            </TableCell>
            <TableCell align='center'>
              <Grid
                alignItems='center'
                container
                direction='row'
                justifyContent='center'
                spacing={4}
              >
                <Grid item>
                  <Tooltip title='Eliminar campaña'>
                    <IconButton
                      onClick={() => handleActionsCampaigns(campaign)}
                    >
                      <img
                        alt='delete'
                        height={24}
                        src={DeleteIcon}
                        width={24}
                      />
                    </IconButton>
                  </Tooltip>
                </Grid>
                <Grid
                  item
                  onClick={() => handleActionsCampaigns(campaign, 'update')}
                >
                  <Tooltip title='Actualizar campaña'>
                    <IconButton color='primary'>
                      <BorderColorIcon />
                    </IconButton>
                  </Tooltip>
                </Grid>
                <Grid item>
                  <UploadUsersCampaignIconButton
                    campaignId={campaign?.id}
                    icon={<GroupAddIcon />}
                  />
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
      {isShowSuccessAlert && (
        <Alert
          alertContentText='La campaña se ha eliminado'
          alertTextButton='Cerrar'
          alertTitle='¡Eliminado!'
          isOpen={isShowSuccessAlert}
          setIsOpen={setIsShowSuccessAlert}
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
      {isShowConfirmAlert && (
        <Alert
          actionButton={handleUpdateCampaign}
          alertContentText='Los datos de esta campaña se sobre escribirán'
          alertTextButton='Cancelar'
          alertTitle='Quieres editar esta campaña?'
          isShowPrimaryButton
          isOpen={isShowConfirmAlert}
          setIsOpen={setIsShowConfirmAlert}
          primaryButtonTextAlert='Aceptar'
        />
      )}
    </Box>
  )
}

export default Campaigns
