import React, { useState, useEffect, useContext } from 'react'
import { Redirect } from 'react-router-dom'
import { toast } from 'react-toastify'
import jwt_decode from 'jwt-decode'
import { Layout, Menu, Table, Button, Space, Modal, Form, Input, Select, InputNumber, message, Tag, List, Divider } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  UnorderedListOutlined,
  ProfileOutlined,
  RobotOutlined,
  PlusOutlined,
  LogoutOutlined,
  MinusOutlined,
  BarChartOutlined
} from '@ant-design/icons';

import { GlobalContext } from '../../context/GlobalContext'

import { formatPrice, formatDate } from '../../utils'

import './styles.css'

const { Header, Sider, Content } = Layout
const { Option } = Select

const Admin = () => {
  const { getUsers, users, categories, products, combos, newCategory, deleteCategory, newProduct, logout, newCombo, deleteProduct, deleteCombo, allTransactions, getAllTransactionsByAdmin, confirmTransaction, cancelTransaction } = useContext(GlobalContext)

  let [collapsed, setCollapsed] = useState(false)
  let [menu, setMenu] = useState('users')
  let [showModal, setShowModal] = useState(false)

  let [name, setName] = useState('')
  let [type, setType] = useState('')
  let [category, setCategory] = useState('')
  let [price, setPrice] = useState(null)
  let [image, setImage] = useState(null)
  let [productSelected, setProductSelected] = useState('')
  let [listProducts, setListProducts] = useState([])
  let [count, setCount] = useState(null)

  let token = localStorage.getItem('token')
  let isAdmin
  if (token) {
    let user = jwt_decode(token)
    let { role } = user
    isAdmin = role == 'admin' ? true : false
  }

  const toggle = () => {
    setCollapsed(!collapsed)
  }

  const handleChangeImage = (e) => {
    let file = e.target.files[0]
    if (file && file.type.includes('image')) {
      setImage(file)
    } else {
      toast.warn('You only can upload a image', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  }

  const upNew = () => {
    switch (menu) {
      case 'users': {

      }
      case 'categories': {
        if (name && type) {
          setName('')
          setType('')
          setShowModal(false)
          return newCategory({ name, type })
        } else
          toast.warn('Please fill all fields', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
      }
      case 'products': {
        if (name && category && price && image && price > 0) {
          setName('')
          setCategory('')
          setPrice(null)
          setImage(null)
          setShowModal(false)
          return newProduct({ name, category, price, image })
        } else
          toast.warn('Please fill all fields', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
      }
      case 'combos': {
        if (name && category && listProducts.length > 0 && price && price > 0 && image) {
          setName('')
          setCategory('')
          setProductSelected('')
          setListProducts([])
          setPrice(null)
          setImage(null)
          setShowModal(false)
          return newCombo({ name, category, products: listProducts, price, image })
        } else
          toast.warn('Please fill all fields', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
      }
    }
  }

  const deleteOne = id => {
    if (id) {
      switch (menu) {
        case 'users': {

        }
        case 'categories': {
          return deleteCategory(id)
        }
        case 'products': {
          return deleteProduct(id)
        }
        case 'combos': {
          return deleteCombo(id)
        }
      }
    }
  }

  const resetState = () => {
    setName('')
    setType('')
    setCategory('')
    setPrice(null)
    setImage(null)
    setProductSelected('')
    setListProducts([])
    setCount(null)
    setShowModal(false)
  }

  const handleCancelModal = () => {
    resetState()
  }

  let modalTile = menu === 'users' ? 'Create New User' :
    menu === 'categories' ? 'Create New Category' :
      menu === 'products' ? 'Create New Product' :
        menu === 'combos' ? 'Create New Combo' : ''

  useEffect(() => {
    getUsers()
    getAllTransactionsByAdmin()
  }, [])

  const getUserById = id => {
    return users.find(e => e._id == id)
  }

  const getProductById = id => {
    return products.find(e => e._id == id)
  }

  const getComboById = id => {
    return combos.find(e => e._id == id)
  }

  const confirmTransactionByAdmin = id => {
    confirmTransaction(id)
  }

  const cancelTransactionByAdmin = id => {
    cancelTransaction(id)
  }

  const categoryColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => text
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      // filters: [
      //   { text: 'Product', value: 'product' },
      //   { text: 'Combo', value: 'combo' },
      // ],
      // // filteredValue: filteredInfo.name || null,
      // onFilter: (value, record) => record.type ? record.type.toUpperCase().includes(value.toUpperCase()) : '',
      render: type => <Tag color={type === 'product' ? 'green' : 'volcano'} key={type}>
        {type ? type.toUpperCase() : ''}
      </Tag>
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button onClick={() => deleteOne(record._id)} type="primary" danger>
            Delete
          </Button>
        </Space>
      )
    }
  ]

  const userColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => text
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button onClick={() => alert(record._id)} type="primary" danger>
            Delete
          </Button>
        </Space>
      ),
    },
  ]

  const productColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => text
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: category => category.name
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: price => formatPrice(price)
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: image => <img style={{ width: 100, height: 100 }} src={`http://localhost:5000/images\/${image}`} />
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button onClick={() => deleteOne(record._id)} type="primary" danger>
            Delete
          </Button>
        </Space>
      ),
    },
  ]

  const comboColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => text
    },
    {
      title: 'Products',
      dataIndex: 'products',
      key: 'products',
      render: products => {
        return products.map(e => <div>{e.count} x {e.productName}</div>)
      }
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: price => formatPrice(price)
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: image => <img style={{ width: 100, height: 100 }} src={`http://localhost:5000/images\/${image}`} />
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button onClick={() => deleteOne(record._id)} type="primary" danger>
            Delete
          </Button>
        </Space>
      ),
    },
  ]

  const transactionColumns = [
    {
      title: 'User',
      dataIndex: 'userId',
      key: 'userId',
      render: userId => {
        let user = getUserById(userId)
        return <>
          <p>{user.name}</p>
          <p>{user.email}</p>
          <p>{user.address}</p>
          <p>{user.phone}</p>
        </>
      }
    },
    {
      title: 'Products',
      dataIndex: 'products',
      key: 'products',
      render: products => {
        return products.map(e => {
          let product = getProductById(e.id)
          return <>{e.count} x {product.name}</>
        })
      }
    },
    {
      title: 'Combos',
      dataIndex: 'combos',
      key: 'combos',
      render: combos => {
        return combos.map(e => {
          let combo = getComboById(e.id)
          return <>{e.count} x {combo.name}</>
        })
      }
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      render: total => formatPrice(total)
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: createdAt => formatDate(createdAt)
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: status => <Tag color={status === 'success' ? 'green' : status === 'in-process' ? 'orange' : 'red'} key={status}>
        {status ? status.toUpperCase() : ''}
      </Tag>
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => {
        if (record.status === 'in-process') {
          return <>
            <Button onClick={() => confirmTransactionByAdmin(record._id)} type="primary" primary>
              Done
            </Button>
            <Button style={{ marginTop: '6px' }} onClick={() => cancelTransactionByAdmin(record._id)} type="primary" danger>
              Cancel
            </Button>

          </>
        }
      }
    },
  ]

  const addProductToCombo = () => {
    if (productSelected && count && count > 0) {
      setCount(null)
      let pro = getProductById(productSelected)
      let product = listProducts.find(e => e.productId == productSelected)
      if (product) {
        product.count += count
        setListProducts([...listProducts.filter(e => e.productId != productSelected), product])
      } else
        setListProducts([...listProducts, { productId: productSelected, productName: pro.name, count: count }])
    } else {

    }
  }

  const deleteProductToCombo = id => {
    setListProducts([...listProducts.filter(e => e.productId != id)])
  }


  useEffect(() => {
    if (listProducts.length > 0) {
      let sumPrice = listProducts.reduce((acc, e) => acc + e.count * getProductById(e.productId).price, 0)
      setPrice(sumPrice)
    } else {
      setPrice(null)
    }
  }, [listProducts])

  return (
    isAdmin ? <Layout style={{ height: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" onClick={({ item, key, keyPath, domEvent }) => setMenu(key)} defaultSelectedKeys={['users']}>
          <Menu.Item key="users" icon={<UserOutlined />}>
            Users
          </Menu.Item>
          <Menu.Item key="categories" icon={<UnorderedListOutlined />}>
            Categories
          </Menu.Item>
          <Menu.Item key="products" icon={<ProfileOutlined />}>
            Products
          </Menu.Item>
          <Menu.Item key="combos" icon={<RobotOutlined />}>
            Combos
          </Menu.Item>
          <Menu.Item key="transactions" icon={<BarChartOutlined />}>
            Transactions
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: '0 20px' }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: toggle,
          })}
          <Button onClick={() => logout({ isAdmin: true })} type="primary" style={{ position: 'absolute', right: '16px', top: '15px' }}><LogoutOutlined /> Logout</Button>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          {menu !== 'transactions' ? <Button style={{ marginBottom: 8 }} type="primary" onClick={() => setShowModal(true)}><PlusOutlined />
          New
        </Button> : ''}
          <Modal
            title={modalTile}
            visible={showModal}
            okText='Save'
            onOk={() => upNew()}
            onCancel={() => handleCancelModal()}
          >
            {menu === 'users' ? 'Users' :
              menu === 'categories' ? <>
                <Form
                  labelCol={{ span: 4 }}
                  wrapperCol={{ span: 18 }}
                  layout="horizontal"
                  initialValues={{ size: 'default' }}
                  size={'default'}
                >

                  <Form.Item label="Name">
                    <Input value={name} onChange={e => setName(e.target.value)} />
                  </Form.Item>
                  <Form.Item label="Type">
                    <Select value={type} onSelect={value => setType(value)}>
                      <Select.Option value='product'>Product</Select.Option>
                      <Select.Option value='combo'>Combo</Select.Option>
                    </Select>
                  </Form.Item>
                </Form>
              </> : menu === 'products' ? <>
                <Form
                  labelCol={{ span: 4 }}
                  wrapperCol={{ span: 18 }}
                  layout="horizontal"
                  initialValues={{ size: 'default' }}
                  size={'default'}
                >

                  <Form.Item label="Name">
                    <Input value={name} onChange={e => setName(e.target.value)} />
                  </Form.Item>
                  <Form.Item label="Category">
                    <Select value={category} onSelect={value => setCategory(value)}>
                      {categories.filter(e => e.type === 'product').map(e => <Select.Option value={e._id}>{e.name}</Select.Option>)}
                    </Select>
                  </Form.Item>
                  <Form.Item label="Price">
                    <InputNumber value={price} onChange={value => setPrice(value)} style={{ width: '100%' }} />
                  </Form.Item>
                  <Form.Item label="Image">
                    <input type="file" name='image' onChange={handleChangeImage} />
                  </Form.Item>
                </Form>
              </> :
                  menu === 'combos' ? <>
                    <Form
                      labelCol={{ span: 4 }}
                      wrapperCol={{ span: 18 }}
                      layout="horizontal"
                      initialValues={{ size: 'default' }}
                      size={'default'}
                    >

                      <Form.Item label="Name">
                        <Input value={name} onChange={e => setName(e.target.value)} />
                      </Form.Item>

                      <Form.Item label="Category">
                        <Select value={category} onSelect={value => setCategory(value)}>
                          {categories.filter(e => e.type === 'combo').map(e => <Select.Option value={e._id}>{e.name}</Select.Option>)}
                        </Select>
                      </Form.Item>
                      <Form.Item label="Products">
                        <Input.Group compact style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Select value={productSelected} onSelect={value => setProductSelected(value)} defaultValue="" style={{ width: '70%' }}>
                            <Option value="">Select one product </Option>
                            {products ? products.map(e => <Option value={e._id}>
                              {e.name} -  {e.category.name} - {formatPrice(e.price)}$
                            </Option>) : ''}
                          </Select>
                          <InputNumber
                            style={{ width: '20%' }}
                            placeholder="count"
                            onChange={value => setCount(value)}
                            value={count}
                          />
                          <Button><PlusOutlined onClick={() => addProductToCombo()} /></Button>
                        </Input.Group>
                        <Divider orientation="left">Products Added</Divider>
                        <List
                          size="large"
                          bordered
                          dataSource={listProducts}
                          renderItem={item => {
                            let product = getProductById(item.productId)
                            return <List.Item><Button onClick={() => deleteProductToCombo(item.productId)} danger style={{ marginRight: 6 }}><MinusOutlined /></Button>{item.count} x {product.name} -  {product.category.name} - {formatPrice(product.price)}$</List.Item>
                          }}
                        />
                      </Form.Item>


                      <Form.Item label="Price">
                        <InputNumber value={price} onChange={value => setPrice(value)} style={{ width: '100%' }} />
                      </Form.Item>
                      <Form.Item label="Image">
                        <input type="file" name='image' onChange={handleChangeImage} />
                      </Form.Item>
                    </Form>
                  </> : ''}
          </Modal>
          {menu === 'users' ?
            <Table pagination={false} columns={userColumns} dataSource={users} scroll={{ y: 'calc(100vh - 240px)' }} bordered /> :
            menu === 'categories' ?
              <Table pagination={false} columns={categoryColumns} dataSource={categories} scroll={{ y: 'calc(100vh - 240px)' }} bordered /> :
              menu === 'products' ?
                <Table pagination={false} columns={productColumns} dataSource={products} scroll={{ y: 'calc(100vh - 240px)' }} bordered /> :
                menu === 'combos' ?
                  <Table pagination={false} columns={comboColumns} dataSource={combos} scroll={{ y: 'calc(100vh - 240px)' }} bordered /> :
                  menu === 'transactions' ? <Table pagination={false} columns={transactionColumns} dataSource={allTransactions} scroll={{ y: 'calc(100vh - 240px)' }} bordered /> : ''}
        </Content>
      </Layout>
    </Layout > : <Redirect to='/admin/login' />
  )
}

export default Admin
