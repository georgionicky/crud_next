"use client"
import Head from 'next/head'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { axiosInstance } from "./lib/axios"
import { Button, Card, Col, Flex, Form, Input, Row, Space, Table, Typography, message, notification, Spin } from 'antd'
import { useFetchProducts } from './features/products/useFetchProducts'
import { useMutation, useQuery } from 'react-query'
import { Formik, useFormik } from 'formik'
import { useCreateProduct } from './features/products/useCreateProduct'
import { useDeleteProducts } from './features/products/useDeleteProducts'
import { useEditProduct } from './features/products/useEditProduct'





export default function Home() {
  return (
    <>
      <Head>
        <title>Hello World !</title>
      </Head>
      <main>
        <Card>
          <Typography.Title>Data Product</Typography.Title>
        </Card>
        <Products />
      </main>
    </>
  )
}



function Products() {

  // ^ Ambil dari features/products/AllProducts
  const { data: dataProducts, isLoading: productsLoading, refetch: refetchProduct } = useFetchProducts()


  const [form] = Form.useForm()

  const formik = useFormik({
    initialValues: {
      id: 0,
      no_product: "",
      name: "",
      stock: "",
      type: ""
    },
    onSubmit: async () => {
      const { id, no_product, name, stock, type } = formik.values
      // ^ Jika ada id maka update

      if (id) {
        editProduct({
          id,
          no_product,
          name,
          stock,
          type,
        });

      } else {

        // ^ Post Product
        createProduct({
          no_product,
          name,
          stock,
          type,
        });
      }
      form.setFieldsValue({ "no_product": "", "name": "", "stock": "", "type": "" })
      // message.success("Product submitted successfully!");

    }
  })

  // ^ Edit Data
  const { mutate: editProduct, isLoading: editProductLoad } = useEditProduct({
    onSuccess: () => {
      refetchProduct()
      notification.success({ message: "Success !", description: "Product Edited successfully!" });
    },
    onError: () => {
      notification.error({ message: "Error !", description: "Failed to edit product !" });
    }
  })

  // ^ Tambah Data
  const { mutate: createProduct, isLoading: createProductLoad } = useCreateProduct({
    onSuccess: () => {
      refetchProduct()
      notification.success({ message: "Success !", description: "Product submitted successfully!" });
    },
    onError: () => {
      notification.error({ message: "Error !", description: "Failed to submit product !" });
    }
  })
  // ^ Cara panjang add data
  // const { \ } = useMutation({
  //   mutationFn: async () => {
  //     const { no_product, name, stock, type } = formik.values
  //     const productsResponse = await axiosInstance.post("/product", {
  //       // ^ Artinya sama seperti no_product:no_product, nilainya ambil dari atas
  //       no_product,
  //       name,
  //       stock,
  //       type
  //     })
  //     return productsResponse
  //   }
  // })

  // ^ Delete
  const { mutate: deleteProduct } = useDeleteProducts({
    onSuccess: () => {
      refetchProduct()
      notification.success({ message: "Success !", description: "Product delete successfully!" });
    },
    onError: () => {
      notification.error({ message: "Error !", description: "Failed to delete product !" });
    }
  })
  const confirmDeleteProduct = (id) => {
    const shouldDelete = confirm("Are you sure ?")
    if (shouldDelete) {
      deleteProduct(id)
    }
  }
  const onEditClick = (product) => {
    form.setFieldsValue({ "id": product.id })
    form.setFieldsValue({ "no_product": product.no_product })
    form.setFieldsValue({ "name": product.name })
    form.setFieldsValue({ "stock": product.stock })
    form.setFieldsValue({ "type": product.type })
  }

  const columns = [
    {
      title: "No Product",
      dataIndex: "no_product",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Stock",
      dataIndex: "stock",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Action",
      // dataIndex: "id",
      render: (dataProducts) =>
        <>
          <Button danger type='primary' onClick={() => { confirmDeleteProduct(dataProducts.id) }}>Delete </Button>
          <Button type='primary' onClick={() => { onEditClick(dataProducts) }}>Edit </Button>
          
        </>

    },
  ]

  const handleFormInput = (event) => {
    // console.log(event.target.name);
    formik.setFieldValue(event.target.name, event.target.value)

  }

  return (
    <>
      <Card>
        <Space>
          <Card>
            <Table key={"id"}
              size={20}
              columns={columns}
              loading={productsLoading}
              dataSource={dataProducts}
              pagination={{
                pageSize: 5,
              }}

            ></Table>
          </Card>
        </Space>

        <Space>
          <Card>
            <Formik>
              <Form
                form={form}
                onFinish={formik.handleSubmit}
                name="complex-form"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
              >
                <Form.Item label="id" name="id">
                  <Input onChange={handleFormInput} name='id' value={formik.values.id} />
                </Form.Item>
                <Form.Item label="No.Product" name="no_product"
                  rules={[{
                    required: true,
                    message: "Please input no product !",
                  },
                  ]}
                >
                  <Input onChange={handleFormInput} name='no_product' value={formik.values.no_product} />
                </Form.Item>
                <Form.Item label="Name Product" name="name"
                  rules={[{
                    required: true,
                    message: "Please input name product !",
                  },
                  ]}
                >
                  <Input onChange={handleFormInput} name="name" value={formik.values.name} />
                </Form.Item>
                <Form.Item label="Stock" name="stock"
                  rules={[{
                    required: true,
                    message: "Please input stock !",
                  },
                  ]}
                >
                  <Input onChange={handleFormInput} name="stock" value={formik.values.stock} />
                </Form.Item>
                <Form.Item label="Type" name="type"
                  rules={[{
                    required: true,
                    message: "Please input type !",
                  },
                  ]}
                >
                  <Input onChange={handleFormInput} name="type" value={formik.values.type} />
                </Form.Item>
                <Flex justify={"flex-end"}>
                  <Form.Item colon={false}>
                    {/* UNTUK Menampilkan loading di buttonnya saat add data */}
                    {createProductLoad || editProductLoad ? (<Spin size="medium" />) : (
                      <Button type="primary" htmlType="submit" >
                        Submit
                      </Button>
                    )
                    }
                  </Form.Item>
                </Flex>
              </Form>
            </Formik>
          </Card>
        </Space>
      </Card>


    </>
  )
}