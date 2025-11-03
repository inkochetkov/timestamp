import React, { useState, useEffect } from 'react';
import './App.css';

const TimestampConverter = () => {
  // Состояния для конвертации даты в timestamp
  const [dateTime, setDateTime] = useState('');
  const [timezone, setTimezone] = useState('UTC');
  const [timestampResult, setTimestampResult] = useState('');
  
  // Состояния для конвертации timestamp в дату
  const [timestampInput, setTimestampInput] = useState('');
  const [timezoneTimestamp, setTimezoneTimestamp] = useState('UTC');
  const [dateResult, setDateResult] = useState('');
  
  // Состояния для конвертации миллисекунд в дни, часы, минуты
  const [millisecondsInput, setMillisecondsInput] = useState('');
  const [durationResult, setDurationResult] = useState('');
  
  // Состояния для конвертации времени в миллисекунды
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [milliseconds, setMilliseconds] = useState(0);
  const [totalMilliseconds, setTotalMilliseconds] = useState(0);

  // Информация о миллисекундах в различных единицах времени
  const timeInfo = {
    minute: 60 * 1000,
    hour: 60 * 60 * 1000,
    day: 24 * 60 * 60 * 1000,
    week: 7 * 24 * 60 * 60 * 1000,
    month: 30 * 24 * 60 * 60 * 1000, // приблизительно
    quarter: 91 * 24 * 60 * 60 * 1000, // приблизительно
    year: 365 * 24 * 60 * 60 * 1000 // приблизительно
  };

  // Функция для получения смещения временной зоны в минутах
  const getTimezoneOffset = (tz) => {
    if (tz === 'UTC') return 0;
    
    const match = tz.match(/UTC([+-])(\d+):?(\d+)?/);
    if (match) {
      const sign = match[1] === '+' ? 1 : -1;
      const hours = parseInt(match[2]);
      const minutes = match[3] ? parseInt(match[3]) : 0;
      return sign * (hours * 60 + minutes);
    }
    
    return 0;
  };

  // Конвертация даты и времени в timestamp
  const convertToTimestamp = () => {
    if (!dateTime) {
      setTimestampResult('Пожалуйста, введите дату и время');
      return;
    }
    
    try {
      const date = new Date(dateTime);
      
      // Учет временной зоны
      const offset = getTimezoneOffset(timezone);
      const timestamp = date.getTime() - (date.getTimezoneOffset() * 60000) + (offset * 60000);
      
      setTimestampResult(timestamp.toString());
    } catch (error) {
      setTimestampResult('Ошибка при конвертации: ' + error.message);
    }
  };

  // Конвертация timestamp в дату и время
  const convertToDate = () => {
    if (!timestampInput) {
      setDateResult('Пожалуйста, введите timestamp');
      return;
    }
    
    try {
      const timestamp = parseInt(timestampInput);
      
      if (isNaN(timestamp)) {
        setDateResult('Некорректный timestamp');
        return;
      }
      
      const date = new Date(timestamp);
      
      // Учет временной зоны
      const offset = getTimezoneOffset(timezoneTimestamp);
      date.setMinutes(date.getMinutes() + date.getTimezoneOffset() + offset);
      
      setDateResult(date.toLocaleString());
    } catch (error) {
      setDateResult('Ошибка при конвертации: ' + error.message);
    }
  };

  // Конвертация миллисекунд в дни, часы, минуты
  const convertMillisecondsToDuration = () => {
    if (!millisecondsInput) {
      setDurationResult('Пожалуйста, введите количество миллисекунд');
      return;
    }
    
    try {
      const ms = parseInt(millisecondsInput);
      
      if (isNaN(ms)) {
        setDurationResult('Некорректное количество миллисекунд');
        return;
      }
      
      const days = Math.floor(ms / (1000 * 60 * 60 * 24));
      const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((ms % (1000 * 60)) / 1000);
      const remainingMs = ms % 1000;
      
      setDurationResult(
        `${days} дней, ${hours} часов, ${minutes} минут, ${seconds} секунд, ${remainingMs} миллисекунд`
      );
    } catch (error) {
      setDurationResult('Ошибка при конвертации: ' + error.message);
    }
  };

  // Конвертация времени в миллисекунды
  const convertToMilliseconds = () => {
    const total = 
      days * timeInfo.day + 
      hours * timeInfo.hour + 
      minutes * timeInfo.minute + 
      seconds * 1000 + 
      milliseconds;
    
    setTotalMilliseconds(total);
  };

  // Установка текущей даты и времени по умолчанию
  useEffect(() => {
    const now = new Date();
    const localDateTime = new Date(now.getTime() - (now.getTimezoneOffset() * 60000))
      .toISOString()
      .slice(0, 16);
    setDateTime(localDateTime);
  }, []);

  return (
    <div className="timestamp-converter">
      <h1>Timestamp Converter</h1>
      
      {/* Блок 1: Описание timestamp */}
      <div className="block">
        <h2>Что такое Timestamp?</h2>
        <p>
          Timestamp (временная метка) - это числовое представление даты и времени, 
          обычно выражаемое как количество миллисекунд, прошедших с 1 января 1970 года 
          00:00:00 UTC (эпоха Unix).
        </p>
        <p>
          Timestamp широко используется в программировании для:
        </p>
        <ul>
          <li>Хранения дат в базах данных</li>
          <li>Сравнения дат и времени</li>
          <li>Вычисления разницы между датами</li>
          <li>Логирования событий</li>
          <li>Синхронизации между системами</li>
        </ul>
      </div>
      
      {/* Блок 2: Конвертация даты и времени в timestamp */}
      <div className="block">
        <h2>Конвертация даты и времени в Timestamp</h2>
        <div className="converter">
          <div className="input-group">
            <label>Дата и время:</label>
            <input 
              type="datetime-local" 
              value={dateTime} 
              onChange={(e) => setDateTime(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>Временная зона:</label>
            <select value={timezone} onChange={(e) => setTimezone(e.target.value)}>
              <option value="UTC">UTC</option>
              <option value="UTC+1">UTC+1</option>
              <option value="UTC+2">UTC+2</option>
              <option value="UTC+3">UTC+3 (Москва)</option>
              <option value="UTC+4">UTC+4</option>
              <option value="UTC+5">UTC+5</option>
              <option value="UTC-1">UTC-1</option>
              <option value="UTC-2">UTC-2</option>
              <option value="UTC-3">UTC-3</option>
              <option value="UTC-4">UTC-4</option>
              <option value="UTC-5">UTC-5 (Нью-Йорк)</option>
            </select>
          </div>
          <button onClick={convertToTimestamp}>Конвертировать</button>
          <div className="result">
            <strong>Timestamp:</strong> {timestampResult}
          </div>
        </div>
      </div>
      
      {/* Блок 3: Конвертация timestamp в дату и время */}
      <div className="block">
        <h2>Конвертация Timestamp в дату и время</h2>
        <div className="converter">
          <div className="input-group">
            <label>Timestamp (миллисекунды):</label>
            <input 
              type="number" 
              value={timestampInput} 
              onChange={(e) => setTimestampInput(e.target.value)}
              placeholder="Введите timestamp"
            />
          </div>
          <div className="input-group">
            <label>Временная зона:</label>
            <select value={timezoneTimestamp} onChange={(e) => setTimezoneTimestamp(e.target.value)}>
              <option value="UTC">UTC</option>
              <option value="UTC+1">UTC+1</option>
              <option value="UTC+2">UTC+2</option>
              <option value="UTC+3">UTC+3 (Москва)</option>
              <option value="UTC+4">UTC+4</option>
              <option value="UTC+5">UTC+5</option>
              <option value="UTC-1">UTC-1</option>
              <option value="UTC-2">UTC-2</option>
              <option value="UTC-3">UTC-3</option>
              <option value="UTC-4">UTC-4</option>
              <option value="UTC-5">UTC-5 (Нью-Йорк)</option>
            </select>
          </div>
          <button onClick={convertToDate}>Конвертировать</button>
          <div className="result">
            <strong>Дата и время:</strong> {dateResult}
          </div>
        </div>
      </div>
      
      {/* Блок 4: Конвертация миллисекунд в дни, часы, минуты */}
      <div className="block">
        <h2>Конвертация миллисекунд в дни, часы, минуты</h2>
        <div className="converter">
          <div className="input-group">
            <label>Миллисекунды:</label>
            <input 
              type="number" 
              value={millisecondsInput} 
              onChange={(e) => setMillisecondsInput(e.target.value)}
              placeholder="Введите количество миллисекунд"
            />
          </div>
          <button onClick={convertMillisecondsToDuration}>Конвертировать</button>
          <div className="result">
            <strong>Длительность:</strong> {durationResult}
          </div>
        </div>
      </div>
      
      {/* Блок 5: Конвертация времени в миллисекунды */}
      <div className="block">
        <h2>Конвертация времени в миллисекунды</h2>
        <div className="converter">
          <div className="input-row">
            <div className="input-group">
              <label>Дни:</label>
              <input 
                type="number" 
                value={days} 
                onChange={(e) => setDays(parseInt(e.target.value) || 0)}
                min="0"
              />
            </div>
            <div className="input-group">
              <label>Часы:</label>
              <input 
                type="number" 
                value={hours} 
                onChange={(e) => setHours(parseInt(e.target.value) || 0)}
                min="0"
                max="23"
              />
            </div>
            <div className="input-group">
              <label>Минуты:</label>
              <input 
                type="number" 
                value={minutes} 
                onChange={(e) => setMinutes(parseInt(e.target.value) || 0)}
                min="0"
                max="59"
              />
            </div>
            <div className="input-group">
              <label>Секунды:</label>
              <input 
                type="number" 
                value={seconds} 
                onChange={(e) => setSeconds(parseInt(e.target.value) || 0)}
                min="0"
                max="59"
              />
            </div>
            <div className="input-group">
              <label>Миллисекунды:</label>
              <input 
                type="number" 
                value={milliseconds} 
                onChange={(e) => setMilliseconds(parseInt(e.target.value) || 0)}
                min="0"
                max="999"
              />
            </div>
          </div>
          <button onClick={convertToMilliseconds}>Конвертировать</button>
          <div className="result">
            <strong>Всего миллисекунд:</strong> {totalMilliseconds}
          </div>
        </div>
      </div>
      
      {/* Блок 6: Информационный блок */}
      <div className="block">
        <h2>Информация о миллисекундах</h2>
        <div className="info-grid">
          <div className="info-item">
            <span className="label">В 1 минуте:</span>
            <span className="value">{timeInfo.minute} мс</span>
          </div>
          <div className="info-item">
            <span className="label">В 1 часе:</span>
            <span className="value">{timeInfo.hour} мс</span>
          </div>
          <div className="info-item">
            <span className="label">В 1 дне:</span>
            <span className="value">{timeInfo.day} мс</span>
          </div>
          <div className="info-item">
            <span className="label">В 1 неделе:</span>
            <span className="value">{timeInfo.week} мс</span>
          </div>
          <div className="info-item">
            <span className="label">В 1 месяце (приблизительно):</span>
            <span className="value">{timeInfo.month} мс</span>
          </div>
          <div className="info-item">
            <span className="label">В 1 квартале (приблизительно):</span>
            <span className="value">{timeInfo.quarter} мс</span>
          </div>
          <div className="info-item">
            <span className="label">В 1 году (приблизительно):</span>
            <span className="value">{timeInfo.year} мс</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimestampConverter;