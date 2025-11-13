import React from 'react';
import type { FlightRecommendation as FlightRecommendationType } from '../../types/flight.types';

interface FlightRecommendationProps {
  recommendation: FlightRecommendationType | null;
  isLoading: boolean;
  error: Error | null;
}

const FlightRecommendation: React.FC<FlightRecommendationProps> = ({ 
  recommendation, 
  isLoading, 
  error 
}) => {
  // Handle loading state
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="w-16 h-16 border-4 border-[#722f37]/30 border-t-[#9d4851] rounded-full animate-spin mb-6"></div>
        <p className="text-[#dbb8bd] text-lg">Analyzing your flight...</p>
        <p className="text-[#dbb8bd]/60 text-sm mt-2">Getting weather data and landmark information</p>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-6">
        <h3 className="text-red-300 font-medium text-lg mb-2">Unable to analyze flight</h3>
        <p className="text-red-400 text-sm">{error.message}</p>
      </div>
    );
  }

  // Handle no recommendation
  if (!recommendation) {
    return (
      <div className="text-center py-8 text-[#dbb8bd]">
        Enter your flight details above to get a personalized seat recommendation.
      </div>
    );
  }

  const { flight, recommendation: seatRec } = recommendation;

  return (
    <div className="space-y-6">
      {/* Flight Details Header */}
      <div className="bg-[#190a0f]/60 border border-[#722f37]/20 rounded-xl p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-bold text-[#f4e6e8] mb-1">
              Flight {flight.flightNumber}
            </h2>
            <p className="text-[#dbb8bd] text-lg">
              {flight.route} • {flight.airline}
            </p>
          </div>
          <div className="text-right text-sm text-[#dbb8bd]">
            <p>{new Date(flight.date).toLocaleDateString()}</p>
            <p>{flight.aircraft}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <span className="block font-medium text-[#f4e6e8]">Departure</span>
            <span className="text-[#dbb8bd]">{flight.departure_time}</span>
          </div>
          <div>
            <span className="block font-medium text-[#f4e6e8]">Arrival</span>
            <span className="text-[#dbb8bd]">{flight.arrival_time}</span>
          </div>
          <div>
            <span className="block font-medium text-[#f4e6e8]">Duration</span>
            <span className="text-[#dbb8bd]">
              {Math.floor(flight.duration / 60)}h {flight.duration % 60}m
            </span>
          </div>
        </div>
      </div>

      {/* Seat Recommendation */}
      <div className="bg-[#190a0f]/60 border border-[#722f37]/20 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-[#f4e6e8]">
            Recommended Seat
          </h3>
          <div className="flex items-center space-x-2">
            <div className="text-right">
              <div className="text-sm text-[#dbb8bd]">Confidence</div>
              <div className="text-lg font-bold text-[#f4e6e8]">{seatRec.confidence}/10</div>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-[#722f37] to-[#9d4851] rounded-full flex items-center justify-center">
              <span className="text-white font-bold">{seatRec.confidence}</span>
            </div>
          </div>
        </div>

        {/* Seat Visualization */}
        <div className="flex items-center space-x-6 mb-6">
          <div className="flex-1">
            <div className="bg-[#722f37]/20 border border-[#722f37]/40 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-[#f4e6e8] mb-1">
                {seatRec.recommendedSeat === 'left' ? 'Left Side' : 'Right Side'}
              </div>
              <div className="text-[#dbb8bd] text-sm">
                {seatRec.seatType === 'window' ? 'Window Seat' : 'Aisle Seat'}
              </div>
            </div>
          </div>
          
          {/* Simple airplane seat diagram */}
          <div className="flex-shrink-0">
            <div className="w-20 h-32 bg-[#371e23]/80 border border-[#722f37]/30 rounded-lg relative">
              <div className="absolute top-2 left-1 right-1 h-1 bg-[#722f37]/60 rounded"></div>
              <div className={`absolute top-6 w-3 h-3 rounded ${
                seatRec.recommendedSeat === 'left' ? 'left-1 bg-[#9d4851]' : 'right-1 bg-[#9d4851]'
              }`}></div>
              <div className={`absolute top-6 w-3 h-3 rounded border border-[#722f37]/40 ${
                seatRec.recommendedSeat === 'left' ? 'right-1' : 'left-1'
              }`}></div>
            </div>
          </div>
        </div>

        {/* Reasoning */}
        <div className="mb-6">
          <h4 className="font-medium text-[#f4e6e8] mb-2">Why this seat?</h4>
          <p className="text-[#dbb8bd] leading-relaxed">{seatRec.reasoning}</p>
        </div>

        {/* Expected Views */}
        {seatRec.expectedViews.length > 0 && (
          <div className="mb-6">
            <h4 className="font-medium text-[#f4e6e8] mb-3">Expected Views</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {seatRec.expectedViews.map((view, index) => (
                <div 
                  key={index}
                  className="bg-[#722f37]/10 border border-[#722f37]/20 rounded-lg p-3 flex items-center space-x-3"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-[#722f37] to-[#9d4851] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm">{index + 1}</span>
                  </div>
                  <span className="text-[#dbb8bd] text-sm">{view}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Additional Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-[#f4e6e8] mb-2">Best Viewing Times</h4>
            <p className="text-[#dbb8bd] text-sm">{seatRec.bestViewingTimes}</p>
          </div>
          <div>
            <h4 className="font-medium text-[#f4e6e8] mb-2">Weather Impact</h4>
            <p className="text-[#dbb8bd] text-sm">{seatRec.weatherImpact}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightRecommendation;