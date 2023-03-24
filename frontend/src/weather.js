import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { WiDaySunny, WiCloud, WiDayCloudy, WiDayFog, WiDayRain, WiDaySnow } from 'react-icons/wi';

const Weather = ({ weather }) => {
  const { temperature, description, icon } = weather;

  let weatherIcon;
  switch (icon) {
    case '01d':
      weatherIcon = <WiDaySunny size={128} />;
      break;
    case '02d':
      weatherIcon = <WiDayCloudy size={128} />;
      break;
    case '03d':
    case '03n':
    case '04d':
    case '04n':
      weatherIcon = <WiCloud size={128} />;
      break;
    case '09d':
    case '09n':
      weatherIcon = <WiDayRain size={128} />;
      break;
    case '10d':
      weatherIcon = <WiDayRain size={128} />;
      break;
    case '11d':
    case '11n':
      weatherIcon = <WiDayThunderstorm size={128} />;
      break;
    case '13d':
      weatherIcon = <WiDaySnow size={128} />;
      break;
    case '50d':
      weatherIcon = <WiDayFog size={128} />;
      break;
    default:
      weatherIcon = <WiDayCloudy size={128} />;
  }

  return (
    <Container>
      <Row>
        <Col xs={12}>
          <h1>{temperature}&#176;C</h1>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          {weatherIcon}
          <p>{description}</p>
        </Col>
      </Row>
    </Container>
  );
};

export default Weather;
