import { useRouter } from 'next/router'
import { getFilteredEvents } from '../../dummy-data'
import EventList from '../../components/events/event-list'
import ResultsTitle from '../../components/events/results-title'
import { Fragment } from 'react'
import Button from '../../components/ui/button'
import ErrorAlert from '../../components/ui/error-alert'

const FilterEventsPage = () => {
  const router = useRouter()

  const filterData = router.query.slug

  if (!filterData) {
    return <p className="center">Loading ...</p>
  }
  const [year, month] = filterData
  const _numYear = +year
  const _numMonth = +month

  if (isNaN(_numYear) || isNaN(_numMonth) || _numYear > 2030 || _numYear < 2021 || _numMonth < 1 || _numMonth > 12) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>Invalid filter! plese check the filter</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    )
  }

  const filteredEvents = getFilteredEvents({ year: _numYear, month: _numMonth })

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No events found!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    )
  }

  const date = new Date(_numYear, _numMonth - 1)

  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  )
}

export default FilterEventsPage
