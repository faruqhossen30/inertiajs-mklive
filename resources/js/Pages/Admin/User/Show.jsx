import BreadcumComponent from '@/Components/Dashboard/BreadcumComponent'
import { db } from '@/firebase'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { CogIcon, EyeIcon, PencilIcon, PlusCircleIcon, PlusIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Head, Link, router, usePage } from '@inertiajs/react'
import { collection, doc, getDoc, getDocs, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table'
import { DescriptionDetails, DescriptionList, DescriptionTerm } from '@/components/description-list'
import moment from 'moment'
import { DeleteAlert } from '@/Components/Alert/DeleteAlert'
import { StatusAlert } from '@/Components/Alert/StatusAlert'
import { Button } from '@/Components/button'


const Show = () => {
    const { uid } = route().params;

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchDocument = async () => {
            try {
                const docRef = doc(db, "users", uid); // specify your collection and document ID
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setUser(docSnap.data());
                } else {
                    setError("Document does not exist!");
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDocument();
    }, []);

    // Host
    const setToHost = async () => {
        try {
            const docRef = doc(db, "users", uid);
            updateDoc(docRef, { isHost: true })
            console.log("Document updated successfully!");
            location.reload()
        } catch (error) {
            console.error("Error updating document:", error);
        }
    };

    const removeFromHost = async () => {
        try {
            const docRef = doc(db, "users", uid);
            updateDoc(docRef, { isHost: false })
            console.log("Document updated successfully!");
            location.reload()
        } catch (error) {
            console.error("Error updating document:", error);
        }
    };

    const setToAgency = async () => {
        try {
            const docRef = doc(db, "users", uid);
            updateDoc(docRef, {
                agency: {
                    name: user.name,
                    hostingList: [],
                    start: serverTimestamp(),
                    status: true
                }
            })
            console.log("Document updated successfully!");
            location.reload()
        } catch (error) {
            console.error("Error updating document:", error);
        }
    };

    const removeFromAgency = async () => {
        try {
            const docRef = doc(db, "users", uid);
            updateDoc(docRef, { agency: null })
            console.log("Document updated successfully!");
            location.reload()
        } catch (error) {
            console.error("Error updating document:", error);
        }
    };

    // Topup

    const setTopUp = async () => {
        try {
            const docRef = doc(db, "users", uid);
            updateDoc(docRef, { isTopup: true })
            console.log("Document updated successfully!");
            location.reload()
        } catch (error) {
            console.error("Error updating document:", error);
        }
    };

    const removeFromTopUp = async () => {
        try {
            const docRef = doc(db, "users", uid);
            updateDoc(docRef, { isTopup: false })
            console.log("Document updated successfully!");
            location.reload()
        } catch (error) {
            console.error("Error updating document:", error);
        }
    };




    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />
            <div className="py-12 bg-white p-5">
                {loading && <p>Loading</p>}
                {error && <p className="text-red-600">{error}</p>}

                {user && <DescriptionList>
                    <DescriptionTerm>Photo</DescriptionTerm>
                    <DescriptionDetails>
                        <img src={user.photoURL} alt="photo" className="h-20 rounded border" />
                    </DescriptionDetails>

                    <DescriptionTerm>Name</DescriptionTerm>
                    <DescriptionDetails>{user.name}</DescriptionDetails>

                    <DescriptionTerm>Email</DescriptionTerm>
                    <DescriptionDetails>{user.email}</DescriptionDetails>

                    <DescriptionTerm>ID</DescriptionTerm>
                    <DescriptionDetails>{user.id}</DescriptionDetails>

                    <DescriptionTerm>Diamond</DescriptionTerm>
                    <DescriptionDetails>{user.diamond}</DescriptionDetails>

                    <DescriptionTerm>Level</DescriptionTerm>
                    <DescriptionDetails>{user.level}</DescriptionDetails>

                    <DescriptionTerm>Host - { }</DescriptionTerm>



                    <DescriptionDetails>
                        {/* <Link href={route('admin.user.sethost', user.uid)} className="border px-2 py-1 border-red-400 rounded text-red-400 hover:text-green-400 hover:border-green-400">
                            Set to Host
                        </Link> */}
                        {/* <Button type="button" onClick={()=>setToHost() }  >Add T</Button> */}

                        {/* <StatusAlert icon={<PlusIcon className="w-4 h-5" />} title="Add to host" href={route('admin.user.show', 'sdfsdf')} /> */}

                        {user.isHost ?
                            <button onClick={() => removeFromHost()} className="border flex space-x-2 px-2 py-1 border-red-400 rounded text-red-400 hover:text-green-400 hover:border-green-400">
                                <XMarkIcon className="text-red-400 w-6 hover:text-green-400" /> <span>Remove From Host {user.isHost}</span>
                            </button>

                            : <button onClick={() => setToHost()} className="border flex space-x-2 px-2 py-1 border-red-400 rounded text-red-400 hover:text-green-400 hover:border-green-400">
                                <PlusCircleIcon className="text-red-400 w-6 hover:text-green-400" /> <span>Set to Host {user.isHost}</span>
                            </button>
                        }

                    </DescriptionDetails>

                    <DescriptionTerm>Agency</DescriptionTerm>
                    <DescriptionDetails>
                        {user.agency ?
                            <button onClick={() => removeFromAgency()} className="border flex space-x-2 px-2 py-1 border-red-400 rounded text-red-400 hover:text-green-400 hover:border-green-400">
                                <XMarkIcon className="text-red-400 w-6 hover:text-green-400" /> <span>Remove From Agency {user.isHost}</span>
                            </button>

                            : <button onClick={() => setToAgency()} className="border flex space-x-2 px-2 py-1 border-red-400 rounded text-red-400 hover:text-green-400 hover:border-green-400">
                                <PlusCircleIcon className="text-red-400 w-6 hover:text-green-400" /> <span>Set to Agency {user.isHost}</span>
                            </button>
                        }
                    </DescriptionDetails>

                    <DescriptionTerm>Topup</DescriptionTerm>
                    <DescriptionDetails>
                        {user.isTopup ?
                            <button onClick={() => removeFromTopUp()} className="border flex space-x-2 px-2 py-1 border-red-400 rounded text-red-400 hover:text-green-400 hover:border-green-400">
                                <XMarkIcon className="text-red-400 w-6 hover:text-green-400" /> <span>Remove From TopUP {user.isHost}</span>
                            </button>

                            : <button onClick={() => setTopUp()} className="border flex space-x-2 px-2 py-1 border-red-400 rounded text-red-400 hover:text-green-400 hover:border-green-400">
                                <PlusCircleIcon className="text-red-400 w-6 hover:text-green-400" /> <span>Set to TopUp {user.isHost}</span>
                            </button>
                        }
                    </DescriptionDetails>




                </DescriptionList>}
            </div>

        </AuthenticatedLayout>
    )
}

export default Show
