import { useEffect, useState } from "react";
import endpoint from "../../utils/apiUtil";
import api from "../../api.json";
import LocationsDataTable from "./LocationsDataTable";
import AddModal from "./AddModal";

function SuggestedLocation() {
  const [state, setState] = useState({
    page: 1,
    limit: 10,
    totalRecords: 0,
    data: [],
    addLoc: false,
    editData: {},
  });

  const getData = () => {
    endpoint
      .get(api.getSuggestLocs)
      .then((res) => {
        setState({ ...state, data: res?.data?.data, totalRecords: res?.data?.totalRecords ? res?.data?.totalRecords : 0 });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getData();
  }, []);

  const onPageChange = (pageNum) => {
    setState({
      ...state,
      page: pageNum,
      data: [],
    });
  };

  const deleteLoc = (id) => {
    endpoint
      .delete(api.deleteSuggestLocs + "/" + id)
      .then((res) => {
        if (res.data.status) {
          setState({
            ...state,
            data: [],
          });
          getData();
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="px-4 py-8 bg-gray-200 h-full lg:px-12 w-full">
      <div className="flex justify-between pb-8 items-center">
        <div>
          <i className="fa-solid fa-arrow-left text-2xl mr-4 cursor-pointer"></i>
          <span className="text-3xl font-semibold pb-3">Suggested Locations</span>
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg" onClick={() => setState({ ...state, addLoc: true })}>
          + Add Location
        </button>
      </div>
      <div>
        <LocationsDataTable
          data={state.data}
          onPageChange={onPageChange}
          page={state.page}
          pageSize={state.limit}
          totalRecords={state.totalRecords}
          onEdit={(data) => setState({ ...state, editData: data, addLoc: true })}
          onDelete={(id) => deleteLoc(id)}
        />
      </div>
      <AddModal
        open={state.addLoc}
        isEdit={Object.keys(state.editData).length > 0}
        editData={state.editData}
        onClose={(bool) => {
          if (bool) getData();
          setState({
            ...state,
            addLoc: false,
            data: bool ? [] : state.data,
            editData: {},
          });
        }}
      />
    </div>
  );
}

export default SuggestedLocation;
