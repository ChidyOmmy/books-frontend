import { Avatar, Stack, Button,AvatarGroup,Pagination } from '@mui/material';
import React, { useState,useEffect } from 'react';
import 'katex/dist/katex.min.css'
import Editor from './Editor';

const EditPages = ({ book }) => {
    const [value, setValue] = useState(`# Hi`)
    const [updateMode, setUpdateMode] = useState(false)
    const [pages, setPages] = useState([])
    const [pageCount, setPageCount] = useState(0)
    const [currentPage, setCurrentPage] = useState({})

    let count = (pageCount / 4)
    if (!Number.isInteger(count)) count = Math.ceil(count);

    const updatePage = async () => {
        try {
            const response = await fetch(`http://localhost:8000/books/update-page`,{
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    pageId: currentPage._id,
                    content: value
                })
            })
            const result = await response.json()
            console.log(result)
        } catch (error) {
            console.log(error.message)
        }
    }
    const handleNew  = () => {
        setUpdateMode(false)
        setValue(`#Hi`)
    }
    const handleEditorChange = (event) => {
        console.log(event.target.value)
        setValue(event.target.value)
    }
    const addPage = async () => {
        console.log(book._id)
        try {
            const response = await fetch('http://localhost:8000/books/create-page', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    bookId: book._id,
                    content: value
                })
            })
            const result = await response.json()
            console.log(response)
            console.log(result)
        } catch (error) {
            console.log(error.message)
        }
    }
     const handleChange = (e, page) => {
    getPages(page);
  };
    const getPages = async (skip=0) => {
        try {
            const response = await fetch(`http://localhost:8000/books/${book._id}/pages?skip=${skip}`)
            const result = await response.json()
            if(response.ok){
                setPages(result.pages)
                setPageCount(result.pageCount)
                console.log(result)
            }else{
                console.log(result)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const handlePageClick = (page) => {
        setUpdateMode(true)
        setCurrentPage(page)
        setValue(page.content)
    }
    useEffect(() => {
        getPages()
        return () => {
            
        };
    }, []);
    return (
        <Stack spacing={2}>
            <Stack spacing={2} direction='column' alignItems='center'>
            <Stack spacing={2} direction='row' justifyContent='center'>
                {pages.map((page)=> <Avatar onClick={()=>handlePageClick(page)} key={page._id} src='' alt='page 1' variant='square' sx={{ width: 100, height: 150 }}>{page._id}</Avatar>)}
                <Avatar onClick={handleNew} src='' alt='page 1' variant='square' sx={{ width: 100, height: 150 }}>+</Avatar>
            </Stack>
                 <Pagination 
                 count={count}
                 defaultPage={1}
                 color='primary'
                 shape='rounded'
                 onChange={handleChange}
                 />
            </Stack>
            <Editor value={value} handleEditorChange={handleEditorChange} />
            {updateMode ? <Button onClick={updatePage} variant='contained' color='greenishColor'>Edit Page</Button> : <Button variant='contained' color='secondary' onClick={addPage}>Add Page</Button> }  
        </Stack>
    );
}

export default EditPages;
