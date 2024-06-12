import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Container,
    Row,
    Col,
    Card,
    Button,
    Modal,
    Pagination,
} from 'react-bootstrap';
import styles from '../styles/ImageLibrary.module.css';
import Header from './Header/Header';
import { useDispatch, useSelector } from 'react-redux';
import { deleteArtWork, getArtWorks } from '../store/actions/artWork';

const ImageLibrary = () => {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const artWorks = useSelector((state) => state.artWork.liblaryArtWorks);

    useEffect(() => {
        dispatch(getArtWorks());
    }, [dispatch]);

    const indexOfLastImage = currentPage * itemsPerPage;
    const indexOfFirstImage = indexOfLastImage - itemsPerPage;
    const currentImages = artWorks.slice(indexOfFirstImage, indexOfLastImage);

    const totalPages = Math.ceil(artWorks.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleDelete = (event) => {
        event.stopPropagation();
        dispatch(deleteArtWork(currentId));
        setShowModal(false);
    };

    return (
        <div>
            <Header />
            <Container className={`${styles.imageLibrary} mx-auto my-5`}>
                <Row>
                    {currentImages.map((image) => {
                        const filePath = image.photo;
                        const parts = filePath.split('\\');
                        const photoUrl = parts[parts.length - 1];

                        return (
                            <Col
                                key={image.id}
                                xs={12}
                                sm={6}
                                md={4}
                                lg={3}
                                className="mb-4"
                            >
                                <Link
                                    to={`/${image.id}`}
                                    style={{ textDecoration: 'none' }}
                                >
                                    <Card className={styles.card}>
                                        <Card.Img
                                            variant="top"
                                            src={`http://127.0.0.1:8000//${photoUrl}`}
                                        />
                                        <Card.Body className="d-flex flex-column">
                                            <Card.Title>
                                                {image.name}
                                            </Card.Title>
                                            <Card.Text>
                                                {image.description ||
                                                    'No description.'}
                                            </Card.Text>
                                            <Button
                                                variant="danger"
                                                onClick={(event) => {
                                                    event.preventDefault();
                                                    event.stopPropagation();
                                                    setCurrentId(image.id);
                                                    setShowModal(true);
                                                }}
                                                className="align-self-end"
                                            >
                                                Delete
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                </Link>
                            </Col>
                        );
                    })}
                </Row>

                <Modal
                    show={showModal}
                    onHide={() => setShowModal(false)}
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm deletion</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Are you sure you want to delete this item? It will be
                        deleted permanently.
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="secondary"
                            onClick={() => setShowModal(false)}
                        >
                            Cancel
                        </Button>
                        <Button variant="danger" onClick={handleDelete}>
                            Delete
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Pagination className={styles.paginationContainer}>
                    <Pagination.First
                        onClick={() => handlePageChange(1)}
                        disabled={currentPage === 1}
                    />
                    <Pagination.Prev
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    />
                    {[...Array(totalPages).keys()].map((number) => (
                        <Pagination.Item
                            key={number + 1}
                            active={number + 1 === currentPage}
                            onClick={() => handlePageChange(number + 1)}
                        >
                            {number + 1}
                        </Pagination.Item>
                    ))}
                    <Pagination.Next
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    />
                    <Pagination.Last
                        onClick={() => handlePageChange(totalPages)}
                        disabled={currentPage === totalPages}
                    />
                </Pagination>
            </Container>
        </div>
    );
};

export default ImageLibrary;
