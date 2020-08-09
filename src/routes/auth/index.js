// import {
//     CognitoUserPool,
//     CognitoUserAttribute,
//     CognitoUser,
// } from 'amazon-cognito-identity-js';
require('cross-fetch/polyfill');
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const express = require('express')
const request = require('request')
const router = express.Router()
const poolData = {
    UserPoolId: 'ap-southeast-1_F15O3yCzL', // Your user pool id here
    ClientId: '2eqv0ruvq1rii5giona9s8hpem', // Your client id here
};

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
router.post('/api/auth', async (req, res) => {
    const { username, password} = req.body

    const attributeList = [];
    const dataPhoneNumber = {
        Name: 'phone_number',
        Value: username,
    };
    const attributePhoneNumber = new AmazonCognitoIdentity.CognitoUserAttribute(
        dataPhoneNumber
    );
    attributeList.push(attributePhoneNumber);
    
    userPool.signUp(username, password, attributeList, null, function(
        err,
        result
    ) {
        if (err) {
            res.writeHead(400, { "Content-Type": "application/json"})
            res.write(JSON.stringify({
                message: err.message
            }))
            res.end()
        }
        const cognitoUser = result.user;
        res.writeHead(200, { "Content-Type": "application/json"})
        res.write(JSON.stringify({
            cognitoUser
        }))
        res.end()
    });
});
router.post('/api/auth/confirm', async (req, res) => {
    const { username, verificationCode } = req.body
    var userData = {
        Username: username,
        Pool: userPool,
    };
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.confirmRegistration(verificationCode, true, function(err, result) {
        if (err) {
            res.writeHead(400, { "Content-Type": "application/json"})
            res.write(JSON.stringify({
                message: err.message
            }))
            res.end()
        }
        res.writeHead(200, { "Content-Type": "application/json"})
        res.write(JSON.stringify({
            result
        }))
        res.end()
    });
});
router.post('/api/auth/resend', async (req, res) => {
    const { username } = req.body
    var userData = {
        Username: username,
        Pool: userPool,
    };
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.resendConfirmationCode(function(err, result) {
        if (err) {
            res.writeHead(400, { "Content-Type": "application/json"})
            res.write(JSON.stringify({
                message: err.message
            }))
            res.end()
        }        
        res.writeHead(200, { "Content-Type": "application/json"})
        res.write(JSON.stringify({
            result
        }))
        res.end()
    });
});
router.post('/api/auth/login', async (req, res) => {
    const AWS = require('aws-sdk');
    const { username, password} = req.body
    const authenticationData = {
        Username: username,
        Password: password,
    };
    const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
        authenticationData
    );
    const userData = {
        Username: username,
        Pool: userPool,
    };
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function(result) {
            const accessToken = result.getAccessToken().getJwtToken();
            AWS.config.region = 'ap-southeast-1';
     
            AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                IdentityPoolId: 'ap-southeast-1_F15O3yCzL',
                Logins: {
                    'cognito-idp.ap-southeast-1.amazonaws.com/ap-southeast-1_F15O3yCzL': result
                        .getIdToken()
                        .getJwtToken(),
                },
            })
            AWS.config.credentials.refresh(error => {
                if (error) {
                    console.error(error);
                } else {
                    console.log('Successfully logged!');
                }
            });
            res.writeHead(200, { "Content-Type": "application/json"})
            res.write(JSON.stringify({
                result
            }))
            res.end()
        },
     
        onFailure: function(err) {
            res.writeHead(400, { "Content-Type": "application/json"})
            res.write(JSON.stringify({
                message:err.message
            }))
            res.end()
        },
    });
});

module.exports = router


