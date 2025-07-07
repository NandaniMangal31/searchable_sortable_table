import React, { useState } from "react";  // here i use usestate to serch globally(search each column in table);
const Studentdata = [
    { id: 1, name: 'Rohit', age: 30, marks: 98 },
    { id: 2, name: 'Rahul', age: 20, marks: 95 },
    { id: 3, name: 'Rinna', age: 18, marks: 78 },
    { id: 4, name: 'Raunka', age: 19, marks: 75 },
    { id: 5, name: 'Mohit', age: 25, marks: 69 },
    { id: 6, name: 'Parul', age: 24, marks: 70 },
    { id: 7, name: 'Kuldeep', age: 21, marks: 60 },
    { id: 8, name: 'Pari', age: 18, marks: 44 },
    { id: 9, name: 'Sejal', age: 26, marks: 55 },
    { id: 10, name: 'Sunil', age: 28, marks: 56 },
    { id: 11, name: 'Muskan', age: 29, marks: 60 },
    { id: 12, name: 'Anjani', age: 17, marks: 74 },
    { id: 13, name: 'Mittaly', age: 19, marks: 85 },
    { id: 14, name: 'Yashi', age: 20, marks: 100 },
    { id: 15, name: 'Rajesh', age: 24, marks: 89 },
    { id: 16, name: 'Naresh', age: 25, marks: 82 },
    { id: 17, name: 'Sonali', age: 21, marks: 98 },
];
const App = () => {
    const [data, setdata] = useState(Studentdata);  
    const [sortfield, setsortfield] = useState(null);  
    const [sortorder, setsortorder] = useState("asc");  
    const [search, setsortsearch] = useState('');     
    const [filter, setfilter] = useState({ id: '', name: '', marks: '' });  
    const [Page, setPage] = useState(1);  
    const rowsperpage = 3;  
}

const sortdata = (field) => {  
    const order = sortfield === field && sortorder === 'asc' ? 'asc' : 'des';  
    const sorted = [...data].sort((a, b) => {   
        if (a[field] < b[field]) return order === 'asc' ? -1 : 1;  
        if (a[field] > b[field]) return order === 'asc' ? 1 : -1;  
        return 0;
    });
    setsortorder(order);
    setsortfield(field);
    setdata(sorted);
};

const filterarray = data.filter((item) => {   
    const matchsearch = Object.values(item) 
        .join('')    
        .toLowerCase()  
        .includes(search.toLowerCase());

    const matchfilters =   
        item.name.toLowerCase().includes(filter.name.toLowerCase()) &&     
        String(item.marks).toLowerCase().includes(filter.marks.toLowerCase()) &&
        String(item.id).toLowerCase().includes(filter.id.toLowerCase());

    return matchsearch && matchfilters;  
});


const pagedata = filterarray.slice(  
    (page - 1) * rowsperpage,
    page * rowsperpage        //here the last value of slice we get which show the end of the data
);
const totalpages = Math.ceil(filterarray.length / rowsperpage);  


return (
    <div style={{ padding: "20px" }}>
        <h2>Sortable & Searchable Table</h2>
//global search
        <input
            type="text"
            placeholder="Search all"
            value={search}
            onChange={(e) => setsortsearch(e.target.value)}
            style={{ marginBottom: "10px", width: "300px", padding: "3px" }}
        />
//filter
        <div style={{ margin: '10px' }}>
            <input
                type="text"
                placeholder="Search by ID"
                value={filter.id}
                onChange={(e) => setfilter({ ...filter, id: e.target.value })}
            />
            <input
                type="text"
                placeholder="Search by Name"
                value={filter.name}
                onChange={(e) => setFilter({ ...filter, name: e.target.value })}
                style={{ marginLeft: "10px" }}
            />
            <input
                type="text"
                placeholder="Search by Marks"
                value={filter.marks}
                onChange={(e) => setFilter({ ...filter, marks: e.target.value })}
                style={{ marginLeft: "10px" }}
            />
        </div>
        //table
        <table border="1" cellPadding="8">
            <thead>
                <tr>
                    <th onClick={() => sortData("id")}>ID</th>
                    <th onClick={() => sortData("name")}>Name</th>
                    <th onClick={() => sortData("age")}>Age</th>
                    <th onClick={() => sortData("marks")}>Marks</th>
                </tr>
            </thead>
            <tbody>
                {pageData.map((item) => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.age}</td>
                        <td>{item.marks}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        <div style={{ marginTop: "10px" }}>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (   
                <button
                    key={p}  
                    onClick={() => setPage(p)}  
                    style={{
                        margin: "0 5px",
                        backgroundColor: p === page ? "#aaa" : "#eee",
                    }}
                >
                    {p}
                </button>
            ))}
        </div>
    </div>
);

export default App;