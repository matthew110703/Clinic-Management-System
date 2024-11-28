import { memo, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { DataGrid } from "@mui/x-data-grid";
import { CircularProgress, Paper, Typography } from "@mui/material";

const CustomDataGrid = memo(({ rows, columns, styles = {} }) => {
  const rowHeight = 60;
  const headerHeight = 60;
  const minHeight = 600;

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = () => {
      const timer = setTimeout(() => {
        setLoading(true);
      }, 2000);

      return () => clearTimeout(timer);
    };

    load();
  }, []);

  return (
    <Paper
      style={{
        minWidth: "600px",
        minHeight: `${minHeight}px`,
        width: "auto",
        maxHeight: "80vh",
        borderRadius: "25px",
        display: "flex",
        flexDirection: "column",
        ...styles,
      }}
      className="border-2 border-primary"
    >
      {rows.length === 0 ? (
        <Typography
          variant="h6"
          align="center"
          style={{ margin: "auto", padding: "20px", color: "#666" }}
        >
          {loading ? (
            "No data available"
          ) : (
            <div className="text-center text-inherit">
              <CircularProgress size={24} />
              <br />
              Loading...
            </div>
          )}
        </Typography>
      ) : (
        <DataGrid
          sx={{
            fontFamily: "inherit",
            borderRadius: "25px",
            flexGrow: 1,
            alignItems: "stretch",
          }}
          style={{ height: minHeight }}
          columnHeaderHeight={headerHeight}
          rowHeight={rowHeight}
          getRowClassName={() => "text-lg font-normal bg-background"}
          getRowId={(row) => row._id}
          rows={rows}
          columns={columns}
          pageSizeOptions={[5, 10, 15]}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10 },
            },
          }}
          pagination
          disableRowSelectionOnClick
          disableColumnMenu
        />
      )}
    </Paper>
  );
});

CustomDataGrid.displayName = "CustomDataGrid";

CustomDataGrid.propTypes = {
  rows: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  styles: PropTypes.object,
};

export default CustomDataGrid;
