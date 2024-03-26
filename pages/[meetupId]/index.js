import MeetupDetail from '@/components/meetups/MeetupDetail'
import React from 'react'
//! Server-Side Imports
import { MongoClient, ObjectId, ServerApiVersion } from 'mongodb'

function MeetupDetailPage(props) {
    const meetup = props.meetup

    return (
        <MeetupDetail {...meetup} />
    )
}


//! Server-Side Code

export async function getStaticPaths() {
    const uri = "mongodb+srv://meetupsUser:X9epVlTOe8raXOXn@cluster0.mzrllbz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });

    await client.connect()
    const cursor = client.db('meetups').collection('meetups').find({}, { _id: 1 })
    const data = await cursor.toArray()

    const paths = data.map(obj => ({
        params: {
            meetupId: obj._id.toString()
        }
    }))

    // fallback false shows 404 if not listed
    // fallback true shows blank and wait for new id to fetch
    // fallback blocking waits for new id to fetch before loading
    return ({
        fallback: 'blocking',
        paths: paths
    })
}


export async function getStaticProps(context) {
    const uri = "mongodb+srv://meetupsUser:X9epVlTOe8raXOXn@cluster0.mzrllbz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });

    let meetup = {}

    try {
        const meetupId = context.params.meetupId

        await client.connect()
        const document = await client.db('meetups').collection('meetups').findOne({ _id: ObjectId.createFromHexString(meetupId) })

        meetup = {
            title: document.title,
            image: document.image,
            address: document.address,
            description: document.description
        }

    } catch (error) {
        console.log(error);
    }

    return ({
        props: {
            meetup: meetup
        }
    })
}

export default MeetupDetailPage
