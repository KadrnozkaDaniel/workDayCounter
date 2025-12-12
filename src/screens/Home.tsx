import { useState } from 'react';
import NavigateBeforeRounded from '@mui/icons-material/NavigateBeforeRounded';
import NavigateNextRounded from '@mui/icons-material/NavigateNextRounded';
import WorkOutlineRounded from '@mui/icons-material/WorkOutlineRounded';
import CalendarMonthRounded from '@mui/icons-material/CalendarMonthRounded';
import BeachAccessOutlined from '@mui/icons-material/BeachAccessOutlined';
import { alpha, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { t } from 'i18next';
import { DatePicker } from 'components/common/DatePicker';
import { addMonths, format } from 'date-fns';
import { getCzechPublicHolidays, getWeekdaysInMonth } from 'utils/date';
import { cs } from 'date-fns/locale/cs';

interface IStatPillProps {
  error?: boolean;
}

const Container = styled('div')(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(6),
  backgroundColor: theme.palette.background.default,
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(2),
  },
}));

const Wrapper = styled(Paper)(({ theme }) => ({
  minHeight: '386px',
  backdropFilter: 'blur(8px)',
  background: alpha(theme.palette.background.paper, 0.7),
  border: `1px solid ${alpha('#fff', 0.06)}`,
  boxShadow: `0 10px 30px ${alpha('#000', 0.4)}`,
  padding: theme.spacing(6),
  [theme.breakpoints.down('sm')]: {
    minHeight: '582px',
    padding: theme.spacing(3),
    margin: theme.spacing(2),
    width: '100%',
    boxSizing: 'border-box',
  },
}));

const StatPill = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'error',
})<IStatPillProps>(({ theme, error }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  padding: theme.spacing(1.1, 1.6),
  borderRadius: 99,
  background: error
    ? alpha(theme.palette.error.main, 0.06)
    : alpha(theme.palette.primary.main, 0.08),
  border: `1px solid ${
    error
      ? alpha(theme.palette.error.main, 0.3)
      : alpha(theme.palette.primary.main, 0.25)
  }`,
}));

const HolidayChip = styled(Chip)(({ theme }) => ({
  borderColor: alpha(theme.palette.error.main, 0.4),
  backgroundColor: alpha(theme.palette.error.main, 0.08),
  fontWeight: 600,
}));

const Home = () => {
  const [date, setDate] = useState(() => addMonths(new Date(), 1));

  const year = date.getFullYear();
  const month = date.getMonth();

  const holidays = getCzechPublicHolidays(year);
  const weekdays = getWeekdaysInMonth(year, month);

  const holidayDaysInMonth = weekdays.filter((d) => holidays.has(d.key));
  const workingDays = weekdays.filter((d) => !holidays.has(d.key));
  const czHolidayCount = holidayDaysInMonth.length;

  const handleMonthShift = (offset: number) => {
    setDate((prev) => addMonths(prev, offset));
  };

  const monthLabel = format(date, 'LLLL yyyy', { locale: cs });

  return (
    <Container>
      <Wrapper>
        <Box
          display="flex"
          gap={3}
          justifyContent="space-between"
          flexWrap="wrap"
        >
          <Box display="flex" gap={3} alignItems="center">
            <CalendarMonthRounded fontSize="large" />
            <Box>
              <Typography variant="h4">{t('common.workDayCounter')}</Typography>
              <Typography variant="body2" color="text.secondary">
                {monthLabel}
              </Typography>
            </Box>
          </Box>

          <Box display="flex" alignItems="center">
            <DatePicker
              value={date}
              onChange={(newDate) => {
                setDate(newDate ?? new Date());
              }}
              views={['month', 'year']}
              format="MM.yyyy"
              label={t('date.date')}
            />
            <Tooltip title={t('date.tooltips.previousMonth')} placement="top">
              <IconButton onClick={() => handleMonthShift(-1)} size="large">
                <NavigateBeforeRounded />
              </IconButton>
            </Tooltip>
            <Tooltip title={t('date.tooltips.nextMonth')} placement="top">
              <IconButton onClick={() => handleMonthShift(1)} size="large">
                <NavigateNextRounded />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <StatPill>
            <WorkOutlineRounded fontSize="small" />
            <Box>
              <Typography variant="body2">{t('date.workDays')}</Typography>
              <Typography fontWeight={700} variant="body1">
                {workingDays.length}
              </Typography>
            </Box>
          </StatPill>

          <StatPill error>
            <BeachAccessOutlined fontSize="small" />
            <Box>
              <Typography variant="body2">{t('date.holidays')}</Typography>
              <Typography fontWeight={700} variant="body1">
                {czHolidayCount}
              </Typography>
            </Box>
          </StatPill>
        </Stack>

        {czHolidayCount > 0 && (
          <>
            <Divider sx={{ my: 3 }} />
            <Typography variant="overline" color="text.secondary">
              {t('date.holidaysList')}
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={1}>
              {holidayDaysInMonth.map((holiday) => (
                <HolidayChip
                  label={holiday.label}
                  key={holiday.key}
                  variant="outlined"
                />
              ))}
            </Box>
          </>
        )}
      </Wrapper>
    </Container>
  );
};

export default Home;
