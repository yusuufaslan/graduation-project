import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/header/Navbar";
import axios from "axios";

import { BsInfoCircle } from "react-icons/bs";

const CreateDataset = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [autoSelectedColumns, setAutoSelectedColumns] = useState([]);

  const [dataset, setDataset] = useState({
    projectId: projectId,
    name: "",
    description: "",
    file: null,
    extension: "", 
    columnNames: [],
    columnActions: [],
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchProjectDetail = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3838/api/project/detail",
          { projectId },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = response.data;
        setProject(data.project);
      } catch (error) {
        console.error("Error fetching project detail:", error);
      }
    };
    fetchProjectDetail();
  }, [projectId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataset({ ...dataset, [name]: value });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const fileExtension = file.name.split(".").pop().toLowerCase();
    if (fileExtension === "json" || fileExtension === "csv") {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target.result;
        let columnNames = [];
        let columnActions = [];
        if (fileExtension === "json") {
          const jsonArray = JSON.parse(content);
          if (jsonArray.length > 0) {
            columnNames = Object.keys(jsonArray[0]);
          }
        } else if (fileExtension === "csv") {
          const csvArray = content.split("\n");
          if (csvArray.length > 0) {
            columnNames = csvArray[0].split(",");
          }
        }
        columnActions = new Array(columnNames.length).fill("none");
        const criticalInfoKeywords = {
          en: {
            identity: ["identity", "id", "identity_number", "ssn", "social_security", "driver_license", "passport", "social_security_number"],
            name: ["name", "firstname", "lastname", "full_name"],
            phone: ["phone", "mobile", "telephone", "cellphone", "contact", "gsm"],
            email: ["email", "e-mail"],
            address: ["address", "adress", "street", "city", "town", "province", "state", "country"],
            // dob: ["dob", "date_of_birth", "birth_date", "birthdate"],
            // age: ["age"],
            gender: ["gender", "sex"],
            nationality: ["nationality", "citizenship"],
            passport: ["passport", "passport_number", "passport_no"],
            drivingLicense: ["driving_license", "drivinglicence", "driving_license_number", "license_number"]
          },
          tr: {
            identity: ["tc", "kimlik", "id", "tc_kimlik", "tc_no", "kimlik_no", "tc_kimlik_no", "tc_kimlik_numarası", "nüfus_cüzdanı", "nufus_cuzdani"],
            name: ["isim", "ad", "soyad", "ad_soyad", "adsoyad", "tam_isim"],
            phone: ["telefon", "cep", "gsm", "telefon_no", "telefon_numarası", "cep_telefonu", "cep_telefon_numarası"],
            email: ["e-posta", "e_posta", "email"],
            address: ["adres", "adress", "sokak", "cadde", "mahalle", "şehir", "ilçe", "il", "ülke"],
            // dob: ["doğum_tarihi", "dogum_tarihi", "doğum", "dogum"],
            // age: ["yaş"],
            gender: ["cinsiyet"],
            nationality: ["vatandaşlık", "uyruk", "milliyet"],
            passport: ["pasaport", "pasaport_numarası"],
            drivingLicense: ["ehliyet", "ehliyet_numarası", "sürücü_belgesi"]
          }
        };
        for (let i = 0; i < columnNames.length; i++) {
          const columnName = columnNames[i].toLowerCase().trim();
          let found = false;
          for (const language in criticalInfoKeywords) {
            for (const [action, keywords] of Object.entries(criticalInfoKeywords[language])) {
              if (keywords.some(keyword => columnName === keyword || columnName.startsWith(keyword + "_"))) {
                columnActions[i] = "hash";
                found = true;
                break;
              }
            }
            if (found) break;
          }
        }
        setDataset({
          ...dataset,
          file,
          extension: fileExtension, 
          columnNames: columnNames,
          columnActions: columnActions,
        });
        const automaticallySelectedColumns = columnNames.filter((name, index) => columnActions[index] === "hash");
        if (automaticallySelectedColumns.length > 0) {
          setAutoSelectedColumns(automaticallySelectedColumns);
          setModalOpen(true);
        }
      };
      reader.readAsText(file);
    } else {
      alert("Please upload a JSON or CSV file.");
    }
  };

  const handleColumnActionChange = (e, columnIndex) => {
    const { value } = e.target;
    const updatedColumnActions = [...dataset.columnActions];
    updatedColumnActions[columnIndex] = value;
    setDataset({ ...dataset, columnActions: updatedColumnActions });
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('file', dataset.file);
    formData.append('name', dataset.name);
    formData.append('projectId', dataset.projectId);
    formData.append('columnNames', dataset.columnNames.join(','));
    formData.append('columnActions', dataset.columnActions.join(','));
    formData.append('description', dataset.description);
    axios.post('http://localhost:3838/api/project/add-dataset', formData, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((response) => {
      console.log("Dataset submitted:", response.data);
      navigate(`/project/edit/${dataset.projectId}`);
    })
    .catch((error) => {
      console.error("Error submitting dataset:", error);
    });
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8 h-screen">
        <h1 className="text-3xl font-semibold mb-6 text-center">
          {project && `Create New Dataset for: ${project.name}`}
        </h1>
        <form className="max-w-7xl mx-auto bg-white shadow-md rounded-lg overflow-hidden border-2 p-6">
          <p className="text-2xl font-bold mb-4">Dataset Information</p>
          <div className="mb-4 font-bold">
            <label className="block mb-1">
              Name:
              <input
                type="text"
                name="name"
                value={dataset.name}
                onChange={handleChange}
                className="border border-gray-400 rounded-md p-2 w-full font-normal mt-1"
                placeholder="Enter dataset name"
              />
            </label>
          </div>
          <div className="mb-4 font-bold">
            <label className="block mb-1">
              Description:
              <textarea
                name="description"
                value={dataset.description}
                onChange={handleChange}
                className="border border-gray-400 rounded-md p-2 w-full font-normal mt-1"
                placeholder="Enter dataset description"
                rows="4"
              ></textarea>
            </label>
          </div>
          <div className="mb-4 font-bold">
            <label className="block mb-1">
              File:
              <input
                type="file"
                accept=".json, .csv"
                onChange={handleFileUpload}
                className="border border-gray-400 rounded-md p-2 w-full font-normal mt-1"
              />
            </label>
            {dataset.file && (
              <p className="font-bold mt-3">
                Uploaded File Type:{" "}
                <span className="font-normal">{dataset.extension}</span>
              </p>
            )}
          </div>
          <div>
            {dataset.columnNames.length > 0 && (
              <h2 className="text-lg font-bold mb-2 mt-10">Column Actions:</h2>
            )}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-3">
              {dataset.columnNames.map((columnName, columnIndex) => (
                <div key={columnName} className="mb-4">
                  <label className="block mb-1 ml-1 font-normal">
                    {columnName}
                  </label>
                  <select
                    value={dataset.columnActions[columnIndex] || "none"}
                    onChange={(e) => handleColumnActionChange(e, columnIndex)}
                    className="border border-gray-400 rounded-md p-1 w-full font-normal"
                    disabled={autoSelectedColumns.includes(columnName) && (dataset.columnActions[columnIndex] === "none" || dataset.columnActions[columnIndex] === undefined)}
                  >
                    <option value="none" disabled={autoSelectedColumns.includes(columnName)}>No Action</option>
                    <option value="remove">Remove</option>
                    <option value="anonymize">Anonymize</option>
                    <option value="hash">Hash</option>
                    {/* Add more actions as needed */}
                  </select>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            className="bg-green-700 text-white px-4 py-2 rounded-md my-4"
          >
            Submit Dataset
          </button>
        </form>
      </div>
      {modalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100">
                  {/* <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg> */}
                  <BsInfoCircle className="text-3xl text-blue-500"/>
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Automatically Selected Column Options</h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">The following columns are automatically selected as <strong className="text-black">"hash"</strong> option because they may contain critical personal information:</p>
                    <ul className="mt-3 text-sm text-gray-500">
                      {autoSelectedColumns.map((column, index) => (
                        <li key={index}>{column}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                <button onClick={() => setModalOpen(false)} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateDataset;
