import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { VehiclePerson } from '../../../api/VehiclePerson'

export interface PersonProps {
	ownersList?: VehiclePerson[] | undefined
}

export default function Person({ownersList}: PersonProps) {
	const router = useRouter()
	const [owners, setOwners] = useState(ownersList)
	useEffect(() => {
		async function loadData() {
			const response = await fetch(`http://localhost:5000/vehicles?ownerName=${router.query.person}&vehicle=${router.query.vehicle}`)
			const ownersListInner: VehiclePerson[] | undefined = await response.json()
			setOwners(ownersListInner)
		}
		if (ownersList?.length === 0) {
			loadData()
		}
	}, [])
	if (!owners?.[0]) {
		return <div>loading...</div>
	}
	return <pre>{owners[0]?.details}</pre>
}

interface MyNextPageContext extends NextPageContext {
	query: {
		person: string
		vehicle: string
	}
}

Person.getInitialProps = async ({query, req}: NextPageContext) => {
	if (!req) {
		return {ownersList: []}
	}
	const response = await fetch(`http://localhost:5000/vehicles?ownerName=${query.person}&vehicle=${query.vehicle}`)
	const ownersList: VehiclePerson[] | undefined = await response.json()
	return {ownersList: ownersList}
}