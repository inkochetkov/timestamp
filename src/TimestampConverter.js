import React, { useState, useEffect } from 'react';
import './App.css';

const TimestampConverter = () => {
  // Состояния для темы и языка
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('ru');
  
  // Состояния для конвертации даты в timestamp
  const [dateTime, setDateTime] = useState('');
  const [timezone, setTimezone] = useState('UTC');
  const [timestampResult, setTimestampResult] = useState('');
  const [copyTimestampStatus, setCopyTimestampStatus] = useState('');
  
  // Состояния для конвертации timestamp в дату
  const [timestampInput, setTimestampInput] = useState('');
  const [timezoneTimestamp, setTimezoneTimestamp] = useState('UTC');
  const [dateResult, setDateResult] = useState('');
  const [copyDateStatus, setCopyDateStatus] = useState('');
  
  // Состояния для конвертации миллисекунд в дни, часы, минуты
  const [millisecondsInput, setMillisecondsInput] = useState('');
  const [durationResult, setDurationResult] = useState('');
  const [copyDurationStatus, setCopyDurationStatus] = useState('');
  
  // Состояния для конвертации времени в миллисекунды
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [milliseconds, setMilliseconds] = useState(0);
  const [totalMilliseconds, setTotalMilliseconds] = useState(0);
  const [copyTotalMsStatus, setCopyTotalMsStatus] = useState('');

  // Тексты для разных языков
  const translations = {
    ru: {
      title: 'Конвертер Timestamp',
      themeLight: 'Светлая',
      themeDark: 'Тёмная',
      language: 'Язык',
      
      // Блок 1
      whatIsTimestamp: 'Что такое Timestamp?',
      timestampDescription1: 'Timestamp (временная метка) - это числовое представление даты и времени, обычно выражаемое как количество миллисекунд, прошедших с 1 января 1970 года 00:00:00 UTC (эпоха Unix).',
      timestampDescription2: 'Timestamp широко используется в программировании для:',
      timestampUses: [
        'Хранения дат в базах данных',
        'Сравнения дат и времени',
        'Вычисления разницы между датами',
        'Логирования событий',
        'Синхронизации между системами'
      ],
      
      // Блок 2
      convertToTimestamp: 'Конвертация даты и времени в Timestamp',
      dateTime: 'Дата и время:',
      timezone: 'Временная зона:',
      convert: 'Конвертировать',
      timestamp: 'Timestamp:',
      pleaseEnterDateTime: 'Пожалуйста, введите дату и время',
      conversionError: 'Ошибка при конвертации:',
      
      // Блок 3
      convertToDate: 'Конвертация Timestamp в дату и время',
      timestampMs: 'Timestamp (миллисекунды):',
      enterTimestamp: 'Введите timestamp',
      dateTimeResult: 'Дата и время:',
      pleaseEnterTimestamp: 'Пожалуйста, введите timestamp',
      invalidTimestamp: 'Некорректный timestamp',
      
      // Блок 4
      msToDuration: 'Конвертация миллисекунд в дни, часы, минуты',
      milliseconds: 'Миллисекунды:',
      enterMilliseconds: 'Введите количество миллисекунд',
      duration: 'Длительность:',
      pleaseEnterMs: 'Пожалуйста, введите количество миллисекунд',
      invalidMs: 'Некорректное количество миллисекунд',
      days: 'дней',
      hours: 'часов',
      minutes: 'минут',
      seconds: 'секунд',
      ms: 'миллисекунд',
      
      // Блок 5
      durationToMs: 'Конвертация времени в миллисекунды',
      daysLabel: 'Дни:',
      hoursLabel: 'Часы:',
      minutesLabel: 'Минуты:',
      secondsLabel: 'Секунды:',
      millisecondsLabel: 'Миллисекунды:',
      totalMs: 'Всего миллисекунд:',
      
      // Блок 6
      msInfo: 'Информация о миллисекундах',
      inMinute: 'В 1 минуте:',
      inHour: 'В 1 часе:',
      inDay: 'В 1 дне:',
      inWeek: 'В 1 неделе:',
      inMonth: 'В 1 месяце (приблизительно):',
      inQuarter: 'В 1 квартале (приблизительно):',
      inYear: 'В 1 году (приблизительно):',
      
      // Кнопки
      copy: 'Копировать',
      copied: 'Скопировано!',
      copyError: 'Ошибка копирования'
    },
    en: {
      title: 'Timestamp Converter',
      themeLight: 'Light',
      themeDark: 'Dark',
      language: 'Language',
      
      // Block 1
      whatIsTimestamp: 'What is Timestamp?',
      timestampDescription1: 'Timestamp is a numeric representation of date and time, usually expressed as the number of milliseconds that have elapsed since January 1, 1970, 00:00:00 UTC (Unix epoch).',
      timestampDescription2: 'Timestamp is widely used in programming for:',
      timestampUses: [
        'Storing dates in databases',
        'Comparing dates and times',
        'Calculating differences between dates',
        'Event logging',
        'Synchronization between systems'
      ],
      
      // Block 2
      convertToTimestamp: 'Convert Date and Time to Timestamp',
      dateTime: 'Date and Time:',
      timezone: 'Timezone:',
      convert: 'Convert',
      timestamp: 'Timestamp:',
      pleaseEnterDateTime: 'Please enter date and time',
      conversionError: 'Conversion error:',
      
      // Block 3
      convertToDate: 'Convert Timestamp to Date and Time',
      timestampMs: 'Timestamp (milliseconds):',
      enterTimestamp: 'Enter timestamp',
      dateTimeResult: 'Date and time:',
      pleaseEnterTimestamp: 'Please enter timestamp',
      invalidTimestamp: 'Invalid timestamp',
      
      // Block 4
      msToDuration: 'Convert Milliseconds to Days, Hours, Minutes',
      milliseconds: 'Milliseconds:',
      enterMilliseconds: 'Enter number of milliseconds',
      duration: 'Duration:',
      pleaseEnterMs: 'Please enter number of milliseconds',
      invalidMs: 'Invalid number of milliseconds',
      days: 'days',
      hours: 'hours',
      minutes: 'minutes',
      seconds: 'seconds',
      ms: 'milliseconds',
      
      // Block 5
      durationToMs: 'Convert Time to Milliseconds',
      daysLabel: 'Days:',
      hoursLabel: 'Hours:',
      minutesLabel: 'Minutes:',
      secondsLabel: 'Seconds:',
      millisecondsLabel: 'Milliseconds:',
      totalMs: 'Total milliseconds:',
      
      // Block 6
      msInfo: 'Milliseconds Information',
      inMinute: 'In 1 minute:',
      inHour: 'In 1 hour:',
      inDay: 'In 1 day:',
      inWeek: 'In 1 week:',
      inMonth: 'In 1 month (approximately):',
      inQuarter: 'In 1 quarter (approximately):',
      inYear: 'In 1 year (approximately):',
      
      // Buttons
      copy: 'Copy',
      copied: 'Copied!',
      copyError: 'Copy error'
    }
  };

  const t = translations[language];

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

  // Применяем тему к body
  useEffect(() => {
    document.body.className = theme === 'dark' ? 'dark-theme' : 'light-theme';
  }, [theme]);

  // Функция для копирования текста в буфер обмена
  const copyToClipboard = async (text, setStatusFunction) => {
    try {
      await navigator.clipboard.writeText(text);
      setStatusFunction(t.copied);
      setTimeout(() => setStatusFunction(''), 2000);
    } catch (err) {
      setStatusFunction(t.copyError);
      setTimeout(() => setStatusFunction(''), 2000);
    }
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
      setTimestampResult(t.pleaseEnterDateTime);
      return;
    }
    
    try {
      const date = new Date(dateTime);
      
      // Учет временной зоны
      const offset = getTimezoneOffset(timezone);
      const timestamp = date.getTime() - (date.getTimezoneOffset() * 60000) + (offset * 60000);
      
      setTimestampResult(timestamp.toString());
    } catch (error) {
      setTimestampResult(`${t.conversionError} ${error.message}`);
    }
  };

  // Конвертация timestamp в дату и время
  const convertToDate = () => {
    if (!timestampInput) {
      setDateResult(t.pleaseEnterTimestamp);
      return;
    }
    
    try {
      const timestamp = parseInt(timestampInput);
      
      if (isNaN(timestamp)) {
        setDateResult(t.invalidTimestamp);
        return;
      }
      
      const date = new Date(timestamp);
      
      // Учет временной зоны
      const offset = getTimezoneOffset(timezoneTimestamp);
      date.setMinutes(date.getMinutes() + date.getTimezoneOffset() + offset);
      
      setDateResult(date.toLocaleString());
    } catch (error) {
      setDateResult(`${t.conversionError} ${error.message}`);
    }
  };

  // Конвертация миллисекунд в дни, часы, минуты
  const convertMillisecondsToDuration = () => {
    if (!millisecondsInput) {
      setDurationResult(t.pleaseEnterMs);
      return;
    }
    
    try {
      const ms = parseInt(millisecondsInput);
      
      if (isNaN(ms)) {
        setDurationResult(t.invalidMs);
        return;
      }
      
      const days = Math.floor(ms / (1000 * 60 * 60 * 24));
      const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((ms % (1000 * 60)) / 1000);
      const remainingMs = ms % 1000;
      
      setDurationResult(
        `${days} ${t.days}, ${hours} ${t.hours}, ${minutes} ${t.minutes}, ${seconds} ${t.seconds}, ${remainingMs} ${t.ms}`
      );
    } catch (error) {
      setDurationResult(`${t.conversionError} ${error.message}`);
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
      {/* Панель настроек */}
      <div className="settings-panel">
        <div className="setting">
          <label>{t.language}:</label>
          <div className="toggle-buttons">
            <button 
              className={language === 'ru' ? 'active' : ''}
              onClick={() => setLanguage('ru')}
            >
              RU
            </button>
            <button 
              className={language === 'en' ? 'active' : ''}
              onClick={() => setLanguage('en')}
            >
              EN
            </button>
          </div>
        </div>
        <div className="setting">
          <label>{theme === 'light' ? t.themeLight : t.themeDark}:</label>
          <div className="toggle-buttons">
            <button 
              className={theme === 'light' ? 'active' : ''}
              onClick={() => setTheme('light')}
            >
              ☀️
            </button>
            <button 
              className={theme === 'dark' ? 'active' : ''}
              onClick={() => setTheme('dark')}
            >
              🌙
            </button>
          </div>
        </div>
      </div>

      <h1>{t.title}</h1>
      
      {/* Блок 1: Описание timestamp */}
      <div className="block">
        <h2>{t.whatIsTimestamp}</h2>
        <p>{t.timestampDescription1}</p>
        <p>{t.timestampDescription2}</p>
        <ul>
          {t.timestampUses.map((use, index) => (
            <li key={index}>{use}</li>
          ))}
        </ul>
      </div>
      
      {/* Блок 2: Конвертация даты и времени в timestamp */}
      <div className="block">
        <h2>{t.convertToTimestamp}</h2>
        <div className="converter">
          <div className="input-group">
            <label>{t.dateTime}:</label>
            <input 
              type="datetime-local" 
              value={dateTime} 
              onChange={(e) => setDateTime(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>{t.timezone}:</label>
            <select value={timezone} onChange={(e) => setTimezone(e.target.value)}>
              <option value="UTC">UTC</option>
              <option value="UTC+1">UTC+1</option>
              <option value="UTC+2">UTC+2</option>
              <option value="UTC+3">UTC+3 ({language === 'ru' ? 'Москва' : 'Moscow'})</option>
              <option value="UTC+4">UTC+4</option>
              <option value="UTC+5">UTC+5</option>
              <option value="UTC-1">UTC-1</option>
              <option value="UTC-2">UTC-2</option>
              <option value="UTC-3">UTC-3</option>
              <option value="UTC-4">UTC-4</option>
              <option value="UTC-5">UTC-5 ({language === 'ru' ? 'Нью-Йорк' : 'New York'})</option>
            </select>
          </div>
          <button onClick={convertToTimestamp}>{t.convert}</button>
          <div className="result">
            <div className="result-text">
              <strong>{t.timestamp}:</strong> {timestampResult}
            </div>
            {timestampResult && !timestampResult.includes(t.conversionError) && !timestampResult.includes(t.pleaseEnterDateTime) && (
              <button 
                className="copy-button"
                onClick={() => copyToClipboard(timestampResult, setCopyTimestampStatus)}
              >
                {copyTimestampStatus || t.copy}
              </button>
            )}
          </div>
        </div>
      </div>
      
      {/* Блок 3: Конвертация timestamp в дату и время */}
      <div className="block">
        <h2>{t.convertToDate}</h2>
        <div className="converter">
          <div className="input-group">
            <label>{t.timestampMs}:</label>
            <input 
              type="number" 
              value={timestampInput} 
              onChange={(e) => setTimestampInput(e.target.value)}
              placeholder={t.enterTimestamp}
            />
          </div>
          <div className="input-group">
            <label>{t.timezone}:</label>
            <select value={timezoneTimestamp} onChange={(e) => setTimezoneTimestamp(e.target.value)}>
              <option value="UTC">UTC</option>
              <option value="UTC+1">UTC+1</option>
              <option value="UTC+2">UTC+2</option>
              <option value="UTC+3">UTC+3 ({language === 'ru' ? 'Москва' : 'Moscow'})</option>
              <option value="UTC+4">UTC+4</option>
              <option value="UTC+5">UTC+5</option>
              <option value="UTC-1">UTC-1</option>
              <option value="UTC-2">UTC-2</option>
              <option value="UTC-3">UTC-3</option>
              <option value="UTC-4">UTC-4</option>
              <option value="UTC-5">UTC-5 ({language === 'ru' ? 'Нью-Йорк' : 'New York'})</option>
            </select>
          </div>
          <button onClick={convertToDate}>{t.convert}</button>
          <div className="result">
            <div className="result-text">
              <strong>{t.dateTimeResult}:</strong> {dateResult}
            </div>
            {dateResult && !dateResult.includes(t.conversionError) && !dateResult.includes(t.pleaseEnterTimestamp) && (
              <button 
                className="copy-button"
                onClick={() => copyToClipboard(dateResult, setCopyDateStatus)}
              >
                {copyDateStatus || t.copy}
              </button>
            )}
          </div>
        </div>
      </div>
      
      {/* Блок 4: Конвертация миллисекунд в дни, часы, минуты */}
      <div className="block">
        <h2>{t.msToDuration}</h2>
        <div className="converter">
          <div className="input-group">
            <label>{t.milliseconds}:</label>
            <input 
              type="number" 
              value={millisecondsInput} 
              onChange={(e) => setMillisecondsInput(e.target.value)}
              placeholder={t.enterMilliseconds}
            />
          </div>
          <button onClick={convertMillisecondsToDuration}>{t.convert}</button>
          <div className="result">
            <div className="result-text">
              <strong>{t.duration}:</strong> {durationResult}
            </div>
            {durationResult && !durationResult.includes(t.conversionError) && !durationResult.includes(t.pleaseEnterMs) && (
              <button 
                className="copy-button"
                onClick={() => copyToClipboard(durationResult, setCopyDurationStatus)}
              >
                {copyDurationStatus || t.copy}
              </button>
            )}
          </div>
        </div>
      </div>
      
      {/* Блок 5: Конвертация времени в миллисекунды */}
      <div className="block">
        <h2>{t.durationToMs}</h2>
        <div className="converter">
          <div className="input-row">
            <div className="input-group">
              <label>{t.daysLabel}</label>
              <input 
                type="number" 
                value={days} 
                onChange={(e) => setDays(parseInt(e.target.value) || 0)}
                min="0"
              />
            </div>
            <div className="input-group">
              <label>{t.hoursLabel}</label>
              <input 
                type="number" 
                value={hours} 
                onChange={(e) => setHours(parseInt(e.target.value) || 0)}
                min="0"
                max="23"
              />
            </div>
            <div className="input-group">
              <label>{t.minutesLabel}</label>
              <input 
                type="number" 
                value={minutes} 
                onChange={(e) => setMinutes(parseInt(e.target.value) || 0)}
                min="0"
                max="59"
              />
            </div>
            <div className="input-group">
              <label>{t.secondsLabel}</label>
              <input 
                type="number" 
                value={seconds} 
                onChange={(e) => setSeconds(parseInt(e.target.value) || 0)}
                min="0"
                max="59"
              />
            </div>
            <div className="input-group">
              <label>{t.millisecondsLabel}</label>
              <input 
                type="number" 
                value={milliseconds} 
                onChange={(e) => setMilliseconds(parseInt(e.target.value) || 0)}
                min="0"
                max="999"
              />
            </div>
          </div>
          <button onClick={convertToMilliseconds}>{t.convert}</button>
          <div className="result">
            <div className="result-text">
              <strong>{t.totalMs}:</strong> {totalMilliseconds}
            </div>
            {totalMilliseconds > 0 && (
              <button 
                className="copy-button"
                onClick={() => copyToClipboard(totalMilliseconds.toString(), setCopyTotalMsStatus)}
              >
                {copyTotalMsStatus || t.copy}
              </button>
            )}
          </div>
        </div>
      </div>
      
      {/* Блок 6: Информационный блок */}
      <div className="block">
        <h2>{t.msInfo}</h2>
        <div className="info-grid">
          <div className="info-item">
            <span className="label">{t.inMinute}</span>
            <span className="value">{timeInfo.minute} {t.ms}</span>
          </div>
          <div className="info-item">
            <span className="label">{t.inHour}</span>
            <span className="value">{timeInfo.hour} {t.ms}</span>
          </div>
          <div className="info-item">
            <span className="label">{t.inDay}</span>
            <span className="value">{timeInfo.day} {t.ms}</span>
          </div>
          <div className="info-item">
            <span className="label">{t.inWeek}</span>
            <span className="value">{timeInfo.week} {t.ms}</span>
          </div>
          <div className="info-item">
            <span className="label">{t.inMonth}</span>
            <span className="value">{timeInfo.month} {t.ms}</span>
          </div>
          <div className="info-item">
            <span className="label">{t.inQuarter}</span>
            <span className="value">{timeInfo.quarter} {t.ms}</span>
          </div>
          <div className="info-item">
            <span className="label">{t.inYear}</span>
            <span className="value">{timeInfo.year} {t.ms}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimestampConverter;