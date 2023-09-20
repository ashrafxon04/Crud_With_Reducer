import React, { useReducer } from 'react';
import { users } from './mock';
import { reduder } from './reducer';


const App = () => {

  const [state, dispatch] = useReducer(reduder, {
    data: users,
    search: '',
    name: '',
    status: '',
    select: null
  })

  return (
    <div>
      <select onChange={(e) => dispatch({ type: 'ON_SELECT', payload: e.target.value })}>
        <option value='id'>id</option>
        <option value='name'> name</option>
        <option value='status'>status</option>
      </select>
      <input onChange={(e) => dispatch({ type: 'ON_SEARCH', payload: e.target.value })} type='text' placeholder='search........' />
      <br />
      <br />
      <input
        onChange={(e) => dispatch({ type: 'GET_INPUT-VALUE', payload: { value: e.target.value, inputName: e.target.name } })}
        name='name'
        type='text'
        placeholder='enter your name....' />
      <input
        onChange={(e) => dispatch({ type: 'GET_INPUT-VALUE', payload: { value: e.target.value, inputName: e.target.name } })}
        name='status'
        type='text'
        placeholder='enter your status....' />
      <button onClick={() => dispatch({ type: 'ON_CREATE' })}>AddUser</button>
      <table border='1px' width='50%' style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {state.data.map((value) => (
            <tr key={value.id}>
              <td>{value.id}</td>
              <td>
                {
                  state.select === value.id ?
                    <input
                      name='name'
                      type='text'
                      value={state.name}
                      onChange={(e) => dispatch({ type: 'GET_INPUT-VALUE', payload: { value: e.target.value, inputName: e.target.name } })}
                    /> :
                    value.name
                }
              </td>
              <td>
                {
                  state.select === value.id ?
                    <input
                      name='status'
                      type='text'
                      value={state.status}
                      onChange={(e) => dispatch({ type: 'GET_INPUT-VALUE', payload: { value: e.target.value, inputName: e.target.name } })}
                    /> :
                    value.status
                }
              </td>
              <td>
                <button onClick={() => dispatch({ type: 'ON_DELETE', payload: { ids: value.id } })}>delete</button>
                {
                  state.select === value.id ?
                    <button onClick={()=> dispatch({type: 'ON_SAVE'})}>save</button> :
                    <button onClick={() => dispatch({ type: 'ON_UPDATE', payload: { allData: value } })}>edit</button>
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App
