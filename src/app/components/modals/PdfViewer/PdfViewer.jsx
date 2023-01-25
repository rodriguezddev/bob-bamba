import React from 'react'
import PropTypes from 'prop-types'
import {
  CustomPdfViewerDialog,
  CustomPdfViewerDialogActions,
  CustomPdfViewerDialogTitle,
} from './styles'
import { MainButton } from '../../buttons'

const PdfViewer = ({
  file,
  isOpen,
  pdfViewerTitle,
  pdfViewerButtonText,
  setIsOpen,
}) => {
  const handleClosePdfViewer = () => {
    setIsOpen(false)
  }

  return (
    <CustomPdfViewerDialog
      aria-labelledby='pdf-viewer-dialog-title'
      aria-describedby='pdf-viewer-dialog-description'
      maxWidth='xl'
      onClose={handleClosePdfViewer}
      open={isOpen}
    >
      <CustomPdfViewerDialogTitle id='viewer-dialog-title'>
        {pdfViewerTitle}
      </CustomPdfViewerDialogTitle>
      <iframe height='1500' src={file} title='pdfViewer' width='100%' />
      <CustomPdfViewerDialogActions>
        <MainButton
          data-testid='pdf-viewer-Button-action'
          onClick={handleClosePdfViewer}
        >
          {pdfViewerButtonText}
        </MainButton>
      </CustomPdfViewerDialogActions>
    </CustomPdfViewerDialog>
  )
}

PdfViewer.propTypes = {
  file: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  pdfViewerTitle: PropTypes.string.isRequired,
  pdfViewerButtonText: PropTypes.string.isRequired,
  setIsOpen: PropTypes.func.isRequired,
}

export default PdfViewer
