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
	const calendarItems = [
		{
			description : "finish inf 133",
			tag: "inf133",
			priority: "!!"
		}
	]

	const tagMap : {[key : string] : string} = {
		"inf133" : "brown"
	}

	return (
		<div className='events-container'>
			<h2 className='today-heading'>{formattedDate}</h2>
			{calendarItems.map((item, key) => (
				<div className='event-container'>
					<p key={key}>{item.description}</p>
					<div className='event-tag-container'>
						<div className={`tag-container ${item.priority ==  "!!" ? 'medium' : item.priority == '!' ? 'low' : 'high'}`}>
							<p>{item.priority}</p>
						</div>
						<div className={`tag-container brown ${tagMap[item.tag]}`}>
							<p>{item.tag}</p>
						</div>
					</div>
				</div>
			))}
		</div>
	)
}

export default Events