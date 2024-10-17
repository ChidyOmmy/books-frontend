import React, { useContext, useState, useEffect } from "react";
import { Autocomplete, TextField, Chip, Button, Typography } from "@mui/material";
import { UserContext } from "../../context/userContext";

const AddAuthors = ({ selectedAuthors, setSelectedAuthors, book }) => {
    const { user } = useContext(UserContext)
    const [users, setUsers] = useState([
        { _id: "1", username: "JaneDoe" },
        { _id: "2", username: "JohnSmith" },
        { _id: "3", username: "AliceBrown" },
    ])
    useEffect(() => {
        getUsers()
        return () => { };
    }, []);


    const addAuthors = async () => {
        try {
            const response = await fetch('http://localhost:8000/books/add-authors', {
                method: 'PUT',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    bookId: book._id,
                    authors: selectedAuthors.map((author) => author._id)
                })
            })
            const result = await response.json()
            console.log(result)
        } catch (error) {
            console.log(error.message)
        }
    }
    const getUsers = async (event) => {
        let username;
        if (!event) username = ''
        else username = event.target.value.trim() || 'a'
        try {
            const response = await fetch(`http://localhost:8000/?search=${username}`)
            const result = await response.json()

            const notAuthors = result.users.filter((user) => !(book.authors.some((author) => user._id === author._id)))

            setUsers(notAuthors)
        } catch (error) {
            if (error.name == 'AbortError') console.log('Fetch aborted')
            else {
                console.log(error)
            }
        }
    }

    const handleKeyDown = (event, value) => {
        if (event.key === 'Enter' && value) {

            event.preventDefault()
            const foundAuthor = users.find((author) => author.username === value);

            if (foundAuthor) {

                const alreadyAdded = selectedAuthors.some((author) => author._id === foundAuthor._id);

                if (!alreadyAdded) {
                    setSelectedAuthors([...selectedAuthors, foundAuthor]);
                }
            }
        }
    };

    const handleAuthorSelect = (event, newValue) => {
        if (newValue) {
            const alreadyAdded = selectedAuthors.some((author) => author._id === newValue._id);

            if (!alreadyAdded) {
                setSelectedAuthors([...selectedAuthors, newValue]);
            }
        }
    };

    const handleDeleteChip = (chipToDelete) => () => {
        setSelectedAuthors((chips) =>
            chips.filter((chip) => chip._id !== chipToDelete._id)
        );
    };

    return (
        <div>
            <div style={{ marginTop: 10 }}>
                <Chip
                    key={user._id}
                    label={user.username}
                    sx={{ margin: 1 }}
                />
                {selectedAuthors.map((author) => (
                    <Chip
                        key={author._id}
                        label={author.username}
                        onDelete={handleDeleteChip(author)}
                        sx={{ margin: 1 }}
                    />
                ))}
            </div>
            <Autocomplete
                options={users}
                getOptionLabel={(option) => option.username}
                renderInput={(params) => (
                    <TextField onChange={getUsers} {...params} label="Add Authors" variant="outlined" />
                )}
                onChange={handleAuthorSelect}
                onKeyDown={(event) => handleKeyDown(event, event.target.value)}
            />
        </div>
    );
};

export default AddAuthors;
