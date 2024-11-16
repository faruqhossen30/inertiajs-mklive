import BreadcumComponent from '@/Components/Dashboard/BreadcumComponent'
import { db } from '@/firebase'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { CogIcon, EyeIcon, PencilIcon, PlusCircleIcon, PlusIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Head, Link, router, usePage } from '@inertiajs/react'
import { collection, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table'
import { DescriptionDetails, DescriptionList, DescriptionTerm } from '@/components/description-list'
import moment from 'moment'
import { DeleteAlert } from '@/Components/Alert/DeleteAlert'
import { StatusAlert } from '@/Components/Alert/StatusAlert'
import { Button } from '@/Components/button'
import SubmitButton from '@/Components/Form/SubmitButton'


const Deposit = () => {
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
                </DescriptionList>}

                <form onSubmit={submit}>
                    <Field>
                        <Label>Full name</Label>
                        <Input
                            name="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                        />
                        {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
                    </Field>

                    <Field>
                        <Label>Photo URL</Label>
                        <Input
                            name="photoURL"
                            value={data.photoURL}
                            onChange={(e) => setData('photoURL', e.target.value)}
                        />
                        {errors.photoURL && <ErrorMessage>{errors.photoURL}</ErrorMessage>}
                    </Field>

                    <Field>
                        <Label>Diamond</Label>
                        <Input
                            name="diamond"
                            type="number"
                            value={data.diamond}
                            onChange={(e) => setData('diamond', e.target.value)}
                        />
                        {errors.diamond && <ErrorMessage>{errors.diamond}</ErrorMessage>}
                    </Field>
                    <Field>
                        <Label>Commission</Label>
                        <Input
                            name="commission"
                            type="number"
                            value={data.commission}
                            onChange={(e) => setData('commission', e.target.value)}
                        />
                        {errors.commission && <ErrorMessage>{errors.commission}</ErrorMessage>}
                    </Field>


                    {/* <div className="max-w-sm">
                                <ThumbnailInput name="thumbnail" setData={setData} errors={errors} placeholder="Thumbnail" />
                            </div> */}
                    <div className="py-2">
                        <SubmitButton />
                    </div>
                </form>
            </div>

        </AuthenticatedLayout>
    )
}

export default Deposit
