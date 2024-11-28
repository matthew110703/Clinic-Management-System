import { CustomDataGrid } from "../components";
import { columnHeaders } from "../utils/tableData";

import { useCallback, useState, useEffect } from "react";

// Redux
import { useDispatch } from "react-redux";
import { showForm } from "../store/formSlice";

// Services
import { fetchTokens } from "../services/tokenService";
import socket from "../services/socket";

const Tokens = () => {
  // Redux
  const dispatch = useDispatch();

  // Local State
  const [currentTokens, setCurrentTokens] = useState([]);

  // Load Tokens
  const loadTokens = useCallback(async () => {
    const tokens = await fetchTokens();
    if (tokens.length === 0) return;

    setCurrentTokens(tokens);
  }, []);

  // Load Tokens on initial render
  useEffect(() => {
    loadTokens();
  }, [loadTokens]);

  // Socket IO
  useEffect(() => {
    // Listen for new tokens
    socket.on("newToken", () => {
      loadTokens();
    });

    // Listen for token updates
    socket.on("updateToken", () => {
      loadTokens();
    });

    // Listen for token cancel
    socket.on("deleteToken", () => {
      loadTokens();
    });

    return () => {
      socket.off("newToken");
      socket.off("tokenUpdate");
      socket.off("tokenDelete");
    };
  }, [currentTokens, loadTokens]);

  return (
    <div className="space-y-6">
      <div className="w-full flex items-center justify-between">
        <h2 className="text-3xl">Manage Tokens</h2>
      </div>

      {/* Data Grid */}
      <CustomDataGrid
        columns={columnHeaders.tokensTable}
        rows={currentTokens}
        styles={{
          height: "calc(100vh - 230px)",
        }}
      />
    </div>
  );
};

export default Tokens;
