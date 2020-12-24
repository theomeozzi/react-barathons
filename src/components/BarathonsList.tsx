import React from 'react';
import { IPub, IBarathon } from '../types/api';
import styled from 'styled-components';
import chroma from 'chroma-js';
import { colors } from '../styles/colors';
import { fonts } from '../styles/fonts';

interface IProps {
    pubs: IPub[];
    barathons: IBarathon[];
}

const BarathonsList = ({ barathons, pubs }: IProps): JSX.Element => {

    return (
        <div>
            {barathons.map(
                (barathon: IBarathon) => {
                        const checkpoints = [];
                        {
                            for (let i = 0; i<barathon.checkpoints.length; i++)
                            {
                                for (let indice = 0; indice<pubs.length; indice++)
                                {
                                    if (barathon.checkpoints[i] == pubs[indice]._id)
                                    {
                                        checkpoints.push(pubs[indice]);
                                    }
                                }
                            }
                        }

                        return (
                            <div key={barathon._id}>
                                <SThumbnail>
                                    <SContent>
                                        <STitle> {barathon.name} </STitle>
                                        <SAuthor> par {barathon.author} </SAuthor>
                                        <SParagraph> <SSpan> Parcours : </SSpan> {checkpoints.map((checkpoints) => checkpoints.name).join(' - ')} </SParagraph>
                                    </SContent>
                                </SThumbnail>
                            </div>
                        );
                    })}
        </div>
    );
};

const THUMBNAIL_WIDTH = 250;
const THUMBNAIL_MAX_HEIGHT = 250;

const SAuthor = styled.p`
    color: #FFFFFF;
    text-align: center;
`;

const SParagraph = styled.p`
    color: #FFFFFF;
`;

const SContent = styled.div`
    padding: 10px 15px;
    box-sizing: border-box;
`;

const SSpan = styled.span`
    font-weight: bold;
`;

const STitle = styled.span`
    display: block;
    width: 100%;
    color: ${colors.white};
    font-family: ${fonts.title};
    text-align: center;
    margin-top: 5px;
    font-weight: bold;
    font-size: 20px;
`;

const SThumbnail = styled.a`
    display: block;
    border-radius: 4px;
    background: ${chroma(colors.veryDarkGrey).alpha(0.5).css()};
    width: ${THUMBNAIL_WIDTH}px;
    max-height: ${THUMBNAIL_MAX_HEIGHT}px;
    margin-top: 10px;
`;

export default BarathonsList;