import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../features/userSlice";

import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Space,
  Popconfirm,
  Typography,
  Card,
} from "antd";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const { Title } = Typography;

const Home = () => {
  const dispatch = useDispatch();
  const { list, loading } = useSelector((state) => state.users);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(fetchUsers())
      .unwrap()
      .catch(() => toast.error("Failed to fetch users"));
  }, [dispatch]);

  const openModal = (user = null) => {
    setEditingUser(user);
    if (user) {
      form.setFieldsValue(user);
    } else {
      form.resetFields();
    }
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (editingUser) {
        dispatch(updateUser({ id: editingUser._id, values }))
          .unwrap()
          .then(() => toast.success("User updated successfully"))
          .catch((err) => {
            const msg = err?.response?.data?.message || err?.message;
            toast.error(
              msg === "Email already exists"
                ? "Email already exists "
                : `Failed to update user `
            );
          });
      } else {
        dispatch(createUser(values))
          .unwrap()
          .then(() => toast.success("User created successfully"))
          .catch(() => {
            toast.error("Email already exists");
          });
      }
      setIsModalOpen(false);
    });
  };

  const handleDelete = (id) => {
    dispatch(deleteUser(id))
      .unwrap()
      .then(() => toast.success("User deleted successfully "))
      .catch(() => toast.error("Failed to delete user "));
  };

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Password", dataIndex: "password", key: "password" },
    {
      title: "Actions",
      align: "center",
      render: (_, record) => (
        <Space>
          <Button onClick={() => openModal(record)}>Edit</Button>
          <Popconfirm
            title="Are you sure to delete this user?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => handleDelete(record._id)}
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24, background: "#f5f5f5", minHeight: "100vh" }}>
      <Card style={{ maxWidth: 1000, margin: "0 auto", borderRadius: 12 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 16,
          }}
        >
          <Title level={3} style={{ margin: 0 }}>
            👥 Users Management Platform
          </Title>
          <Button type="primary" onClick={() => openModal()}>
            Add User
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={list}
          rowKey="_id"
          loading={loading}
          bordered
          pagination={{ pageSize: 5 }}
        />
      </Card>

      <Modal
        title={editingUser ? "Edit User" : "Add User"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
        okText={editingUser ? "Update" : "Create"}
      >
        <Form form={form} layout="vertical">
          {/* Name Validation */}
          <Form.Item
            name="name"
            label="Name"
            rules={[
              { required: true, message: "Please input name" },
              { min: 3, message: "Name must be at least 3 characters long" },
              { max: 15, message: "Name cannot exceed 15 characters" },
            ]}
          >
            <Input placeholder="Enter full name" />
          </Form.Item>

          {/* Email Validation */}
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please input email" },
              { type: "email", message: "Please enter a valid email address" },
            ]}
          >
            <Input placeholder="Enter email" />
          </Form.Item>

          {/* Password Validation */}
          <Form.Item
            name="password"
            label="Password"
            rules={[
              { required: true, message: "Please input password" },
              {
                min: 5,
                message: "Password must be at least 5 characters long",
              },
            ]}
          >
            <Input.Password placeholder="Enter password" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Home;
