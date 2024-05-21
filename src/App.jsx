import { Link } from "react-router-dom"
import axios from "axios"

import { useEffect, useState } from "react"

const CustomerList = ({ customers }) => {
  return customers.length > 0 ? (
    <div>
      <h2>Customers</h2>
      {customers.map(inst => {
        return (
          <div key={inst.id}>
            {inst.id} - {inst.name}
          </div>
        )
      })}
    </div>
  ) : (
    <div>
      Loading...
    </div>
  )
}

const NewCustomer = ( {getCustomers} ) => {
  const [name, setName] = useState('')

  const createCustomer = () => {
    
    if (!name) { //no empty names
      return
    }

    axios.post('http://127.0.0.1:8000/customers/', {name: name})
      .then(response => {
        console.log("RESPONSE: ", response)
        if (response.status === 200 || response.status === 201) {
          setName('')
          getCustomers()
        }
      })
      .catch(error => console.log("ERROR: ", error))
  }

  return (
    <div className="pt-5">
      <h2>Create New Customer</h2>
      <input onChange={e => setName(e.target.value)} placeholder="Enter Name" value={name} />
      <button onClick={() => createCustomer()}>
        Create
      </button>
    </div>
  )
}

const DeleteCustomer = ( {getCustomers} ) => {
  const [idNum, setIdNum] = useState(0)

  const deleteThisCustomer = () => {
    axios.delete(`http://127.0.0.1:8000/customers/${idNum}`)
      .then(response => {
        console.log("RESPONSE: ", response)
        setIdNum(0)
        getCustomers()
      })
      .catch(error => console.log("ERROR: ", error))
  }

  return (
    <div className="pt-5">
      <h2>Delete Customer</h2>
      <input onChange={e => setIdNum(e.target.value)} type="number" value={idNum} />
      <button onClick={() => deleteThisCustomer()}>
        Delete
      </button>
    </div>
  )
}

const UpdateCustomer = ( { getCustomers } ) => {
  const [idNum, setIdNum] = useState(0)
  const [name, setName] = useState('')

  const updateThisCustomer = () => {

    if (!name) { //no empty names
      return
    }

    axios.put(`http://127.0.0.1:8000/customers/${idNum}/`, {name: name})
      .then(response => {
        console.log("RESPONSE: ", response)
        setIdNum(0)
        setName('')
        getCustomers()
      })
      .catch(error => console.log("ERROR: ", error))
  }

  return (
    <div className="pt-5">
      <h2>Update Customer</h2>
      <input onChange={e => setIdNum(e.target.value)} type="number" value={idNum} />
      <input onChange={e => setName(e.target.value)} placeholder="Enter New Name" value={name} />
      <button onClick={() => updateThisCustomer()}>
        Update
      </button>
    </div>
  )
}

function App() {
  const [customers, setCustomers] = useState([])

  useEffect(() => {
    getCustomers()
  }, [])

  function getCustomers() {
    axios.get('http://127.0.0.1:8000/customers/')
      .then(response => {
        console.log("RESPONSE: ", response)
        setCustomers(response.data)
      })
      .catch(error => console.log("ERROR: ", error))
  }

  return (
    <div className="p-5">
      <CustomerList customers={customers} />
      <NewCustomer getCustomers={getCustomers} />
      <UpdateCustomer getCustomers={getCustomers} />
      <DeleteCustomer getCustomers={getCustomers} />
    </div>
  )
}

export default App
