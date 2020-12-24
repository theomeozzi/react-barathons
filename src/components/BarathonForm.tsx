import React, { useState } from 'react';
import { IPub } from '../types/api';
import Button from './Button';
import Input from './Input';
import Map from './LeafletMap';

interface IProps {
    pubs: IPub[]
}

const BarathonForm = ({ pubs }: IProps): JSX.Element => {
    const [selectedPubs, setSelectedPubs] = useState<IPub[]>([]);

    const handleSubmit = async (e: any): Promise<void> => {
        // evite le rechargement de la page au submit
        e.preventDefault();
        const checkpoints = e.target.elements.namedItem('pubs').value.split(',');

        const values = {
            name: e.target.elements.namedItem('name').value,
            author: e.target.elements.namedItem('author').value,
            checkpoints
        };

        const response = await fetch('https://miw-server.herokuapp.com/barathons', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        });

        const responseJSON = await response.json();
        console.log(responseJSON);
    };

    const removeLastPub = (): void => {
        const pubs = [...selectedPubs];
        pubs.pop();
        setSelectedPubs(pubs);
    };

    const addPub = (id: string): void => {
        const selectedPub = pubs.find((pub: IPub) => {
            if (pub._id === id) return true;
            return false;
        });

        setSelectedPubs([...selectedPubs, selectedPub]);
    };

    const removePub = (id: string): void => {
        setSelectedPubs(selectedPubs.filter((pub: IPub) => {
            if (id === pub._id) return false;
            return true;
        }));
    };

    return (
        <form onSubmit={handleSubmit}>
            <Input label='Nom' name="name" type="text" placeholder='Nom de votre parcours' />
            <Input label='Auteur' name="author" type="text" placeholder='Votre pseudo' />
            <Input label='pubs' name="pubs" type="text" value={selectedPubs.map((pub: IPub) => pub._id).join(',')} />
            <Button onClick={removeLastPub} type='button'>Remove last</Button>
            <Map
                pubs={pubs}
                addPub={addPub}
                removePub={removePub}
                selectedPubs={selectedPubs}
            />
            <Button type='submit'>Soumettre</Button>
        </form>
    );
};

export default BarathonForm;