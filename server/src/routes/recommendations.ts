import express from 'express'
import type { 
    FlightSearchParams, FlightRecommendation 
} from '../../../shared/types/flight.types';

export const router = express.Router()

router.post('/', (req, res) => {
    console.log(req.body)
    const params: FlightSearchParams = req.body
    const response: FlightRecommendation = {
    flight: {
        flightNumber: params.flightNumber,
        route: "LAX → JFK",
        origin: "LAX",
        destination: "JFK",
        departure_time: "8:30 AM",
        arrival_time: "4:45 PM",
        aircraft: "Boeing 737-800",
        airline: "Holy fucking smokes i got my money up",
        duration: 315, 
        date: params.date
    },
    recommendation: {
        recommendedSeat: 'left',
        seatType: 'window',
        confidence: 9,
        reasoning: 'Based on your flight path and departure time, the left side offers spectacular views of the Grand Canyon around 10:15 AM with excellent lighting conditions. Clear skies are forecasted for optimal visibility.',
        expectedViews: [
            'Grand Canyon National Park (10:15 AM - 10:25 AM)',
            'Rocky Mountains (11:30 AM - 12:00 PM)',
            'Great Lakes region (2:15 PM - 2:30 PM)',
            'Manhattan skyline approach (4:30 PM - 4:45 PM)'
        ],
        bestViewingTimes: 'Peak viewing from 10:15 AM - 12:00 PM for natural landmarks, city approach at 4:30 PM',
        weatherImpact: 'Clear skies expected along entire route. Excellent visibility conditions with minimal cloud cover.'
    }
    }

    res.json(response)
})