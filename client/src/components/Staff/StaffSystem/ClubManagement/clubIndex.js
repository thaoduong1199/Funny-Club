import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Button, Table, Space, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
var dateformat = require("dateformat");

const getClubParams = (params) => {
  return {
    results: params.pagination.pageSize,
    page: params.pagination.current,
    ...params,
  };
};

class ClubIndex extends Component {
  state = {
    data: [],
    pagination: {
      current: 1,
      pageSize: 10,
    },
    loading: false,
    searchText: "",
    searchedColumn: "",
  };

  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          placeholder={"Search"}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ width: 188, marginBottom: 8, display: "block" }}
        ></Input>
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => this.handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  componentDidMount() {
    const { pagination } = this.state;
    this.fetch({ pagination });
  }

  handleTableChange = (pagination) => {
    this.fetch({
      pagination,
    });
  };

  fetch = (params = {}) => {
    this.setState({ loading: true });
    axios({
      method: "GET",
      url: "https://team11-api.azurewebsites.net/api/club/getAllClub",
      data: getClubParams(params),
    }).then((data) => {
      console.log(data);
      this.setState({
        loading: false,
        data: data.data,
        pagination: {
          ...params.pagination,
          total: data.totalCount,
        },
      });
    });
  };

  render() {
    const columns = [
      {
        title: "T??n c??u l???c b???",
        dataIndex: "clubName",
        key: "clubName",
        ...this.getColumnSearchProps("clubName"),
      },
      {
        title: "Ng??y th??nh l???p",
        dataIndex: "registerDate",
        key: "registerDate",
        render: (text, record) => {
          return <p>{dateformat(record.registerDate, "h:MM TT dd-mm-yyyy")}</p>;
        },
      },
      {
        title: "S??? ??i???n tho???i",
        dataIndex: "clubPhone",
        key: "clubPhone",
      },
      {
        title: "Email li??n h???",
        dataIndex: "clubEmail",
        key: "clubEmail",
      },
      {
        title: "C??u l???c b??? c???p",
        dataIndex: "clubGroupType",
        key: "clubGroupType",
        render: (text, record) => {
          return (
            <p>
              {record.clubGroupType === "doanhoi"
                ? "??o??n h???i"
                : record.clubGroupType === "truong"
                ? "Tr?????ng"
                : "Khoa"}
            </p>
          );
        },
        ...this.getColumnSearchProps("clubGroupType"),
      },
      // {
      // 	title: 'T??c v???',
      // 	key: 'action',
      // 	render: (text) => (
      // 		<Space>
      // 			<Button style={{borderColor: 'green'}}>Xu???t B??o C??o</Button>
      // 		</Space>
      // 	),
      // },
    ];

    const { data, pagination, loading } = this.state;
    return (
      <div>
        <h2 className="title-dashboard">T??M KI???M C??C C??U L???C B???</h2>
        <Table
          columns={columns}
          dataSource={data}
          pagination={pagination}
          loading={loading}
          onChange={this.handleTableChange}
        ></Table>
      </div>
    );
  }
}

export default ClubIndex;
