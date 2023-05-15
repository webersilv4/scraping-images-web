'use client';
import React, { useState } from 'react';

import validator from 'validator';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.css';
import '../app/globals.css';

interface ISrc {
    src: string;
}


export default function name() {
    
    const [ url, setUrl ] = useState<string>('');
    const [ error, setError ] = useState<string>('');
    const [ data, setDatas ] = useState<Array<ISrc>>([]);

    const fetchData = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        if (validator.isURL(url))
            await axios.post<Array<ISrc>>('https://scrapingdefotos.vercel.app/api/scraping', {
                url
            })
                .then(res=> setDatas(res.data))
                .catch((err)=> console.log(err));
        else
            setError('Você deve definir uma URL válida.');

    };

    return (
        <>
            <article className='text-center'>

                <div className='mb-5 mt-3'>
                    <span style={{ fontSize: 35 }}>
                        SCRAPING DE FOTOS
                    </span><br />
                    <span>Raspagem de dados WEB</span>
                </div>

                <form onSubmit={e => fetchData(e)}>
                    <div className='col-md-4 d-flex mx-auto'>
                        <input type="url" 
                            className='form-input'
                            placeholder="Digite uma URL"
                            required={true}
                            onChange={ (e)=> setUrl(e.currentTarget.value) } />
                        
                        <input type="submit" 
                            className='ml-2 btn-submit' />
                    </div>
                </form>

                <hr className='mt-5' />

                {
                    error ? 
                        <div className="alert alert-danger container" role="alert">
                            {error}
                        </div> : ''
                }
                

                <div>{data?.map(({src}, key) => (
                    <img key={key} src={src} style={{}} />
                ))}</div>

            </article>
        </>

    );
}