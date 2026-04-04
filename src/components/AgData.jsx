import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AgGridReact } from 'ag-grid-react'
import { themeQuartz } from 'ag-grid-community'
import { fetchPhotos } from '../features/photos/photosSlice'
import './AgData.css'

export default function AgData() {
  const dispatch = useDispatch()
  const { items, status, error } = useSelector((state) => state.photos)

  useEffect(() => {
    if (status === 'idle') dispatch(fetchPhotos())
  }, [status, dispatch])

  if (status === 'loading') {
    return (
      <div className="ag-data-container">
        <div className="alert alert-info">
          <div className="spinner-border spinner-border-sm me-2" role="status"></div>
          Loading photos...
        </div>
      </div>
    )
  }

  if (status === 'failed') {
    return (
      <div className="ag-data-container">
        <div className="alert alert-danger">
          <strong>Error!</strong> {error}
        </div>
      </div>
    )
  }

  const columnDefs = [
    {
      field: 'id',
      headerName: 'ID',
      width: 60,
      sortable: true,
      filter: true,
      cellStyle: { textAlign: 'center' },
    },
    {
      field: 'albumId',
      headerName: 'Album ID',
      width: 80,
      sortable: true,
      filter: true,
      cellStyle: { textAlign: 'center' },
    },
    {
      field: 'title',
      headerName: 'Title',
      flex: 1,
      minWidth: 300,
      sortable: true,
      filter: true,
      wrapText: true,
      autoHeight: true,
    },
    {
      field: 'url',
      headerName: 'View',
      width: 80,
      cellRenderer: (params) => (
        <a
          href={params.value}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-sm btn-outline-primary"
          style={{ textDecoration: 'none' }}
        >
          Open
        </a>
      ),
      cellStyle: { textAlign: 'center' },
    },
    {
      field: 'thumbnailUrl',
      headerName: 'Preview',
      width: 120,
      cellRenderer: (params) => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            padding: '4px',
          }}
        >
          <img
            src={params.value}
            alt="photo"
            loading="lazy"
            style={{
              width: '80px',
              height: '60px',
              objectFit: 'cover',
              borderRadius: '4px',
              border: '1px solid #e9ecef',
            }}
            onError={(e) => {
              e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="80" height="60"%3E%3Crect fill="%23f0f0f0" width="80" height="60"/%3E%3C/svg%3E'
            }}
          />
        </div>
      ),
    },
  ]

  const defaultColDef = {
    resizable: true,
    sortable: true,
  }

  return (
    <div className="ag-data-container">
      <div className="ag-data-card">
        <div className="ag-data-header">
          <h2 className="ag-data-title">Photos Gallery</h2>
          <span className="badge bg-primary">{items.length} photos</span>
        </div>
        <div className="ag-data-grid" style={{ height: '700px' }}>
          <AgGridReact
            theme={themeQuartz}
            rowData={items}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            pagination={true}
            paginationPageSize={20}
            paginationPageSizeSelector={[10, 20, 50, 100]}
            domLayout="normal"
            rowHeight={80}
            headerHeight={50}
          />
        </div>
      </div>
    </div>
  )
}