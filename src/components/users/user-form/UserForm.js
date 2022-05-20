import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './UserForm.scss';
import { getUserById, saveUser } from '../../../utils/http-utils/user-requests';
import { useNavigate, useParams } from 'react-router-dom';

export function UserForm() {

    const params = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState({
        isActive: false,
        name: '',
        picture: '',
        email: '',
        phone: '',
        address: ''
    });

    useEffect(() => {
        if (params.id) {
            getUserById(params.id).then(response => {
                setUser(response.data);
            });
        }        
    }, [params.id])

    const onFormSubmit = (event) => {
        event.preventDefault();

        saveUser(user).then(() => {
            console.log('Success');
            navigate('/users-list');
        });
    }

    const onInputChange = (event) => {        
        let value = event.target.value;
        if (event.target.name === 'isActive') {
            value = event.target.checked;
        }

        setUser((prevState) => {
            return {
                ...prevState,
                [event.target.name]: value
            }
        })
    }

    return (
        <div className="user-form-wrapper">
            <Form onSubmit={onFormSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter name" name="name" value={user.name} onChange={onInputChange}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name="email" value={user.email} onChange={onInputChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Picture</Form.Label>
                    <Form.Control type="text" placeholder="Enter picture url" name="picture" value={user.picture} onChange={onInputChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="tel" placeholder="Enter phone" name="phone" value={user.phone} onChange={onInputChange}/>
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" placeholder="Enter adress" name="address" value={user.address} onChange={onInputChange}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Active" name="isActive" checked={user.isActive} onChange={onInputChange} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
}