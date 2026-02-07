import { StyleSheet } from '@react-pdf/renderer'

// Using Helvetica (built-in font in react-pdf) for reliability
// No font registration needed - Helvetica is always available

// Brand colors
export const colors = {
  primary: '#6366F1', // Indigo
  emerald: '#10B981',
  blue: '#3B82F6',
  amber: '#F59E0B',
  purple: '#A855F7',
  red: '#EF4444',
  dark: '#1F2937',
  darkBg: '#111827',
  cardBg: '#1F2937',
  text: '#F9FAFB',
  textMuted: '#9CA3AF',
  border: 'rgba(255, 255, 255, 0.1)',
}

// Common styles
export const baseStyles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: colors.darkBg,
    padding: 40,
    fontFamily: 'Helvetica',
    color: colors.text,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    paddingBottom: 20,
    borderBottom: `1px solid ${colors.border}`,
  },
  logo: {
    fontSize: 24,
    fontWeight: 700,
    color: colors.primary,
    letterSpacing: 2,
  },
  headerRight: {
    alignItems: 'flex-end',
  },
  date: {
    fontSize: 10,
    color: colors.textMuted,
  },
  title: {
    fontSize: 22,
    fontWeight: 700,
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 12,
    color: colors.textMuted,
    marginBottom: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 600,
    color: colors.text,
    marginBottom: 12,
    paddingBottom: 8,
    borderBottom: `1px solid ${colors.border}`,
  },
  card: {
    backgroundColor: colors.cardBg,
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontSize: 11,
    color: colors.text,
  },
  textMuted: {
    fontSize: 10,
    color: colors.textMuted,
  },
  textBold: {
    fontSize: 11,
    fontWeight: 600,
    color: colors.text,
  },
  badge: {
    backgroundColor: 'rgba(99, 102, 241, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 9,
    color: colors.primary,
    fontWeight: 600,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    borderTop: `1px solid ${colors.border}`,
  },
  footerText: {
    fontSize: 9,
    color: colors.textMuted,
  },
})

// Table styles
export const tableStyles = StyleSheet.create({
  table: {
    width: '100%',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    borderRadius: 4,
    padding: 8,
    marginBottom: 4,
  },
  tableHeaderCell: {
    fontSize: 9,
    fontWeight: 600,
    color: colors.primary,
    textTransform: 'uppercase',
  },
  tableRow: {
    flexDirection: 'row',
    padding: 8,
    borderBottom: `1px solid ${colors.border}`,
  },
  tableRowAlt: {
    flexDirection: 'row',
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderBottom: `1px solid ${colors.border}`,
  },
  tableCell: {
    fontSize: 10,
    color: colors.text,
  },
  tableCellMuted: {
    fontSize: 10,
    color: colors.textMuted,
  },
})

// Stats card styles
export const statsStyles = StyleSheet.create({
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: colors.cardBg,
    borderRadius: 8,
    padding: 16,
  },
  statValue: {
    fontSize: 28,
    fontWeight: 700,
    color: colors.text,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 10,
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statTrend: {
    fontSize: 10,
    marginTop: 8,
  },
  trendUp: {
    color: colors.emerald,
  },
  trendDown: {
    color: colors.red,
  },
  trendStable: {
    color: colors.textMuted,
  },
})

// Gauge styles for PDF (SVG-based)
export const gaugeStyles = StyleSheet.create({
  gaugeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  gaugeValue: {
    fontSize: 24,
    fontWeight: 700,
    color: colors.text,
  },
  gaugeLabel: {
    fontSize: 10,
    color: colors.textMuted,
    textTransform: 'uppercase',
    marginTop: 4,
  },
})

// Macro bar styles
export const macroStyles = StyleSheet.create({
  macroBar: {
    flexDirection: 'row',
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 12,
  },
  macroSegment: {
    height: '100%',
  },
  macroLegend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
  },
  macroItem: {
    alignItems: 'center',
  },
  macroDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginBottom: 4,
  },
  macroValue: {
    fontSize: 14,
    fontWeight: 600,
    color: colors.text,
  },
  macroLabel: {
    fontSize: 9,
    color: colors.textMuted,
  },
})
