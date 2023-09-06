import { Button, Modal, Form, Select, Radio } from "antd";
import {
    BankOutlined,
    ApartmentOutlined,
    EnterOutlined,
    MessageOutlined,
} from "@ant-design/icons";
import { observer } from "mobx-react";
import store from "../../store";
import './App.less'


const AssistantModal = () => {
    const handleCancel = () => {
        store.isAssistantModalOpen = false;
    };

    const handleSubmit = (param) => {
        console.log(param);
        store.isAssistantModalOpen = false;
    };

    return (
        <Modal
            width={300}
            title='面试小助手'
            open={store.isAssistantModalOpen}
            onCancel={handleCancel}
            footer={null}
        >
            <div className='basic-info'>
                <Form onFinish={handleSubmit}>
                    <Form.Item name='round'>
                        <MessageOutlined />轮数
                        <Radio.Group
                            options={[1, 2, 3, 4, 5]}
                            optionType='button'
                            size='small'
                            style={{ width: "100%" }}
                        // onChange={onChange1} value={value1}
                        />
                    </Form.Item>
                    <Form.Item name='company'>
                        <BankOutlined />公司
                        <Select
                            showSearch
                            placeholder='请选择您要面试的公司'
                            optionFilterProp='children'
                            // onChange={onChange}
                            // onSearch={onSearch}
                            // filterOption={filterOption}
                            options={[
                                {
                                    value: "字节跳动",
                                    label: "字节跳动",
                                },
                                {
                                    value: "百度",
                                    label: "百度",
                                },
                                {
                                    value: "阿里",
                                    label: "阿里",
                                },
                                {
                                    value: "腾讯",
                                    label: "腾讯",
                                },
                                {
                                    value: "京东",
                                    label: "京东",
                                },
                                {
                                    value: "美团",
                                    label: "美团",
                                },
                            ]}
                        />
                    </Form.Item>
                    <Form.Item name='apartment'>
                        <ApartmentOutlined />部门
                        <Select
                            showSearch
                            placeholder='请选择您要加入的部门'
                            optionFilterProp='children'
                            // onChange={onChange}
                            // onSearch={onSearch}
                            // filterOption={filterOption}
                            options={[
                                {
                                    value: "部门1",
                                    label: "部门1",
                                },
                                {
                                    value: "部门2",
                                    label: "部门2",
                                },
                            ]}
                        />
                    </Form.Item>
                    <Form.Item name='position'>
                        <EnterOutlined />岗位方向
                        <Select
                            showSearch
                            placeholder='请选择您的岗位方向'
                            optionFilterProp='children'
                            // onChange={onChange}
                            // onSearch={onSearch}
                            // filterOption={filterOption}
                            options={[
                                {
                                    value: "前端开发",
                                    label: "前端开发",
                                },
                                {
                                    value: "后端开发",
                                    label: "后端开发",
                                },
                            ]}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            block
                            type='primary'
                            htmlType='submit'
                            className='login-input'
                        >开始
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </Modal>
    );
};

export default observer(AssistantModal);
