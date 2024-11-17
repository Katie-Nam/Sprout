import React from 'react';
import './Events.css';

type Props = {
	selectedDate ?: Date
}

const Events = ({selectedDate}: Props) => {
	const formattedDate = selectedDate
        ? selectedDate.toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
          })
        : 'No date selected';

	return (
		<div className='events-container'>
			<h2 className='today-heading'>{formattedDate}</h2>
		</div>
	)
}

export default Events