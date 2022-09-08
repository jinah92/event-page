import { getAllEvents } from '../../dummy-data'
import EventList from '../../components/events/event-list'
import EventSearch from '../../components/events/events-search'
import { useRouter } from 'next/router'

const AllEventsPage = () => {
  const events = getAllEvents()
  const router = useRouter()

  const findEventsHandler = (year, month) => {
    const fullPath = `/events/${year}/${month}`
    router.push(fullPath)
  }

  return (
    <div>
      <EventSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </div>
  )
}

export default AllEventsPage
