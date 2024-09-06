import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';

export const generarJwt = ( userId ) => {
    return new Promise( ( resolve, reject ) => {

        const payload = { userId };
        jwt.sign( payload, config.SECRET_KEY, {
            expiresIn: '5h'
        }, ( error, token ) => {
            if ( error ) {
                console.log( error );
                reject( 'No se pudo generar el token' );
            } else {
                resolve( token );
            }
        } );
});
}