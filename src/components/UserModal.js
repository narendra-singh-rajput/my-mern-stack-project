import React, { useEffect, useState } from "react";
import { Modal, Form, Input } from "antd";

const UserModal = ({
  open,
  rowData,
  handleOk,
  handleCancel,
  confirmLoading,
}) => {
  const [initialValues, setInitialValues] = useState({});

  const [form] = Form.useForm();
  const { TextArea } = Input;

  const handleOnChange = (e) => {
    const name = e.target.id;
    const value = e.target.value;
    setInitialValues({ ...initialValues, [name]: value });
  };

  useEffect(() => {
    if (rowData) {
      setInitialValues(rowData);
      form.setFieldsValue(rowData);
    }
  }, [rowData]);

  return (
    <Modal
      title={rowData ? "Update User" : "Add User"}
      open={open}
      okText={rowData ? "Update" : "Save"}
      centered
      onOk={() => handleOk(initialValues)}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
    >
      <div className="user-from">
        <Form
          form={form}
          layout="vertical"
          initialValues={initialValues}
          onChange={handleOnChange}
        >
          <Form.Item label="Name" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input />
          </Form.Item>
          <Form.Item label="Mobile" name="mobile">
            <Input />
          </Form.Item>
          <Form.Item label="Message" name="message">
            <TextArea rows={4} />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default UserModal;
