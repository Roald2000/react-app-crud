
import { useEffect, useRef, useState } from 'react';


export default function App() {

    const [dataValue, setDataValue] = useState();

    const [listData, setListData] = useState([]);

    const handleInputChange = (e) => {
        setDataValue(values => ({ ...values, [e.target.id]: e.target.value }));
    }

    const createItem = (e) => {
        e.preventDefault();
        const newdata = listData.concat(dataValue); // or [...listData,dataValue];
        setListData(newdata);
    }

    const deleteItem = (index) => {
        setListData((previousData) => {
            const newdata = [...previousData]; // The current array and its contents
            previousData.splice(index, 1); // Mutates the current array, removes the selected index with its values
            return newdata // Returns the mutated array
        });
    }


    const updateItem = (index) => {
        setListData((previousData) => {
            const newdata = [...previousData]; // The current array and its contents
            previousData[index] = dataValue; //  Update the selected index's value of the current array
            return newdata; // Returns the mutated array
        })
    }

    useEffect(() => {
        return () => {
            setListData([]);
        }
    }, []);

    const inputRef = useRef(null);

    return <>
        <h1>Simple React CRUD using Arrays</h1>
        <br />
        <form onSubmit={createItem}>
            <div className='input-div'>
                <label htmlFor="item">
                    <input ref={inputRef} autoFocus type="text" name="" id="item" onChange={handleInputChange} required />
                    <span>Input item</span>
                </label>
                <label htmlFor="item">
                    <input type="number" name="" id="price" onChange={handleInputChange} required />
                    <span>Input Price</span>
                </label>
                <label htmlFor="item">
                    <input type="number" name="" id="qty" onChange={handleInputChange} required />
                    <span>Input Quantity</span>
                </label>
            </div>
            <br />
            <div className='submit-div'>
                <button type='submit'>Submit</button>
                <button type='reset'>Reset</button>
            </div>
        </form>
        <div className='list'>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Item</th>
                        <th>Price</th>
                        <th>Qty.</th>
                        <th>Total</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listData && listData.map((item, index) =>
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.item}</td>
                            <td>{parseInt(item.price)}</td>
                            <td>{parseInt(item.qty)}</td>
                            <td>{parseInt(item.price * item.qty)}</td>
                            <td>
                                <button type='button' onClick={() => deleteItem(index)}>Remove</button>
                                <button type='button' onClick={() => updateItem(index)}>Update</button>
                            </td>
                        </tr>
                    )}
                    {listData.length == 0 && <tr><td className='no-item' colSpan={6} onClick={() => inputRef.current.focus()}>Add Items</td></tr>}
                </tbody>

            </table>
        </div>
    </>
}