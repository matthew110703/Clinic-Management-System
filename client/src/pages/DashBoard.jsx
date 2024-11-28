import {
  SliderTabs,
  DataLabel,
  CustomDataGrid,
  CustomButton,
} from "../components";
import { tabs } from "../meta-data";
import { Divider } from "@mui/material";
import { Add } from "@mui/icons-material";
import { columnHeaders } from "../utils/tableData";
import { useCallback, useEffect, useState } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { showForm } from "../store/formSlice";
import { updateStats } from "../store/stats";

// Services
import { fetchTokens } from "../services/tokenService";
import socket from "../services/socket";

const DashBoard = () => {
  // Redux
  const dispatch = useDispatch();
  const activeTab = useSelector((state) => state.tab.activeTab);
  const stats = useSelector((state) => state.stats);

  // Local State
  const [currentTokens, setCurrentTokens] = useState([]);
  const [servedTokens, setServedTokens] = useState([]);

  // Load Tokens
  const loadTokens = useCallback(async () => {
    const tokens = await fetchTokens();
    if (tokens.length === 0) return;

    const consultingToken = tokens.find(
      (token) => token.status === "consulting"
    );

    const waitingTokens = tokens.filter((token) => token.status === "waiting");
    const servedTokens = tokens.filter((token) => token.status === "served");

    // Update Stats
    dispatch(
      updateStats({
        waiting: waitingTokens.length,
        consulting: 1,
        served: servedTokens.length,
      })
    );

    setServedTokens(servedTokens);

    if (consultingToken) {
      setCurrentTokens([consultingToken, ...waitingTokens]);
    } else {
      setCurrentTokens(waitingTokens);
    }
  }, [dispatch]);

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
  }, [currentTokens, loadTokens, servedTokens]);

  return (
    <div className="space-y-3">
      <div className="w-full flex items-center justify-between">
        <div className="flex items-baseline gap-x-6">
          <h2 className="text-3xl">Dashboard</h2>
          <CustomButton
            label="Add Patient"
            size="small"
            startIcon={<Add />}
            classes={"h-8 text-xs"}
            onClick={() =>
              dispatch(
                showForm({ type: "addPatient", title: "Patient Registration" })
              )
            }
          />
        </div>
        <SliderTabs tabs={tabs} />
      </div>
      {/* Data Labels */}
      <div className="flex gap-x-4">
        <DataLabel
          label="Waiting"
          value={stats.waiting}
          info={"Total Patients waiting (real time)"}
        />
        <Divider orientation="vertical" variant="middle" flexItem />
        <DataLabel
          label="Patients Consulted"
          value={stats.served}
          info={"Total Patients Consulted as of today"}
        />
        <Divider orientation="vertical" variant="middle" flexItem />
        <DataLabel
          label="New Patients"
          value={stats.newPatients}
          info={"Newly Registered patients as of today"}
        />
      </div>

      {/* Data Grid */}
      {activeTab === "queue" && (
        <CustomDataGrid
          rows={currentTokens}
          columns={columnHeaders.tokensTable}
        />
      )}
      {activeTab === "served" && (
        <CustomDataGrid
          rows={servedTokens}
          columns={columnHeaders.servedTable}
        />
      )}
    </div>
  );
};

export default DashBoard;
