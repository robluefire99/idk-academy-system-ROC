import React, { useEffect, useState } from 'react';
import { getStudents, getStudentScores } from '../api/api';
import { useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Chip, Typography, CircularProgress, Alert } from '@mui/material';

export default function DummyStudentListPage() {
  const [students, setStudents] = useState([]);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useSelector(state => state.auth.user);
  const role = useSelector(state => state.auth.role);

  useEffect(() => {
    async function fetchData() {
      try {
        if (role === 'lecturer') {
          const res = await getStudents();
          if (res.data.success) {
            setStudents(res.data.students);
            const rowData = [];
            for (const student of res.data.students) {
              const sres = await getStudentScores(student._id);
              let scores = [];
              if (sres.data.success) {
                scores = sres.data.scores.filter(score => score.subject === user.subject);
              }
              rowData.push({
                id: student._id,
                name: student.name,
                email: student.email,
                scores
              });
            }
            setRows(rowData);
          } else {
            setError(res.data.error?.message || 'Failed to fetch students');
          }
        } else if (role === 'student') {
          setStudents([user]);
          const sres = await getStudentScores(user._id);
          let scores = [];
          if (sres.data.success) {
            scores = sres.data.scores;
          }
          setRows([{
            id: user._id,
            name: user.name,
            email: user.email,
            scores
          }]);
        }
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    }
    fetchData();
  }, [user, role]);

  const columns = [
    { field: 'name', headerName: 'Name', flex: 1, minWidth: 150 },
    { field: 'email', headerName: 'Email', flex: 1, minWidth: 200 },
    {
      field: 'scores',
      headerName: 'Scores',
      flex: 2,
      minWidth: 300,
      sortable: false,
      renderCell: (params) => {
        const scores = params.value;
        if (!scores || scores.length === 0) return <Typography color="text.secondary">No scores</Typography>;
        return (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {scores.map(score => (
              <Chip
                key={score._id}
                label={`${score.subject}: ${score.score}/${score.max_score}`}
                color={score.score >= 90 ? 'success' : score.score >= 75 ? 'primary' : 'warning'}
                variant="outlined"
                sx={{ fontWeight: 600 }}
              />
            ))}
          </Box>
        );
      }
    }
  ];

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto', my: 4, p: 3, bgcolor: '#fff', borderRadius: 3, boxShadow: 3 }}>
      <Typography variant="h4" align="center" gutterBottom fontWeight={700} color="primary.dark">
        View IDK Student Data
      </Typography>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 6 }}><CircularProgress /></Box>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <DataGrid
          autoHeight
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 25, 50]}
          sx={{
            bgcolor: '#f9fafb',
            borderRadius: 2,
            '& .MuiDataGrid-columnHeaders': { bgcolor: '#e3f2fd', fontWeight: 700 },
            '& .MuiDataGrid-row': { bgcolor: '#fff' },
            '& .MuiDataGrid-cell': { fontSize: 16 }
          }}
        />
      )}
    </Box>
  );
}
