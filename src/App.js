import React, { useState, useEffect } from "react";
import { Table, Button, notification, Modal } from "antd";
import axios from "axios";
import {
  EditOutlined,
  DeleteOutlined,
  UserAddOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import "./App.css";
import UserModal from "./components/UserModal";
const { confirm } = Modal;

function App() {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [rowData, setRowData] = useState(null);
  const [action, setAction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const openNotification = (responseType, _actionType = null) => {
    let actionType = _actionType ? _actionType : action;
    let description = responseType === 'Success' ? `User ${actionType === 'delete' ? 'deleted' : actionType === 'update' ? 'updated' : 'added'} successfully.` : `Something went wrong - User not ${actionType === 'delete' ? 'deleted' : actionType === 'update' ? 'updated' : 'added'}.`;
    notification.open({
      message: `${responseType} !`,
      description: description,
      placement: 'bottomRight',
    });
  };

  const getAllUsers = () => {
    setLoading(true);
    axios
      .get("/api/users")
      .then((users) => {
        // Get all users
        let _allUsers = users.data;

        // Append key to all users
        const allUsers = _allUsers?.map(object => {
          return { ...object, key: object._id };
        });

        // loading off
        setLoading(false);

        // Update users state
        setUsers(allUsers);
      })
      .catch((err) => {
        setLoading(false);
        console.log('error while fetching users: ', err);
      });
  }

  useEffect(() => {
    getAllUsers();
  }, []);


  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Mobile Number",
      dataIndex: "mobile",
      key: "mobile",
    },
    {
      title: "Comments",
      dataIndex: "message",
      key: "message",
    },
    {
      title: "Actions",
      key: "action",
      render: (_, record) => (
        <div className="common-btn-wrapper">
          <Button
            type="ghost"
            icon={<EditOutlined style={{ color: "white" }} />}
            onClick={() => handleOnClick("update", record)}
          />
          <Button
            type="ghost"
            icon={<DeleteOutlined style={{ color: "white" }} />}
            onClick={() => handleOnClick("delete", record)}
          />
        </div>
      ),
    },
  ];


  const showConfirmationModal = (data) => {
    confirm({
      title: "Do you want to delete these user?",
      icon: <ExclamationCircleFilled />,
      okText: "Delete",
      onOk() {
        handleUserActions(data, 'delete');
      },
      onCancel() { },
    })
  }

  const handleUserActions = async (data, actionDefaultType = null) => {
    setConfirmLoading(true);
    axios
      .post(`/api/users/${actionDefaultType ? actionDefaultType : action}`, data)
      .then(() => {
        setConfirmLoading(false);
        setOpen(false);
        getAllUsers();
        openNotification('Success', actionDefaultType ? actionDefaultType : undefined);
      })
      .catch((err) => {
        setConfirmLoading(false);
        setOpen(false);
        openNotification('Failed', actionDefaultType ? actionDefaultType : undefined);
      });
  }

  const handleOnClick = (actionType, data) => {
    setRowData(data);
    setAction(actionType);
    actionType === 'delete' ? showConfirmationModal(data) : setOpen(true);
  };



  const titleBox = () => {
    return (
      <div className="title-wrapper">
        <div className="title-box">
          <h2>Employees</h2>
        </div>

        <Button
          type="primary"
          danger={true}
          icon={<UserAddOutlined />}
          onClick={() => handleOnClick("add", null)}
        >
          Add User
        </Button>
      </div>
    );
  };

  return (
    <div className="App">
      {open &&
        <UserModal
          open
          rowData={rowData}
          handleOk={(data) => handleUserActions(data)}
          handleCancel={() => setOpen(false)}
          confirmLoading={confirmLoading}
        />
      }
      <div className="users-table">
        <Table
          columns={columns}
          dataSource={users?.length ? users : []}
          title={titleBox}
          loading={loading}
        />
      </div>
    </div>
  );
}

export default App;
