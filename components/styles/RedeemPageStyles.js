import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F1E4', // soft beige theme
  },

  // ===== HEADER =====
  header: {
    height: 220, // bigger hero header
    width: '100%',
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
    marginBottom: 10,
  },
  headerImage: {
    resizeMode: 'cover',
  },
  headerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(158, 126, 99, 0.85)', // warm brown tint overlay
  },
  headerContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 80,
    paddingHorizontal: 25,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: 0.5,
  },
  subText: {
    color: '#F3E9DD',
    fontSize: 16,
    marginTop: 4,
    letterSpacing: 0.3,
  },
  bellButton: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: 40,
    padding: 10,
  },

  // ===== POINTS CARD =====
  pointsCard: {
    backgroundColor: '#fff',
    marginHorizontal: 25,
    marginTop: -35,
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  pointsTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pointsLabel: {
    fontSize: 18,
    color: '#8B7355',
    fontWeight: '500',
  },
  pointsValue: {
    fontSize: 38,
    fontWeight: 'bold',
    color: '#5A4634',
    marginVertical: 12,
  },
  detailButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#9E7E63',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 22,
  },
  detailButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
    letterSpacing: 0.5,
  },

  // ===== SECTION =====
  section: {
    marginTop: 35,
    paddingHorizontal: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#5A4634',
  },
  seeAll: {
    color: '#9E7E63',
    fontWeight: '600',
    fontSize: 13,
  },

  // ===== REWARD CARDS =====
  rewardCard: {
    borderRadius: 18,
    overflow: 'hidden',
    width: 200,
    height: 150,
    marginRight: 16,
    justifyContent: 'flex-end',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  rewardImage: {
    borderRadius: 18,
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  rewardContent: {
    padding: 14,
  },
  rewardTitlePrimary: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 6,
  },
  rewardPointsPrimary: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 13,
  },
  pointsTag: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(158,126,99,0.8)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },

  // ===== PLAIN REWARDS =====
  rewardCardPlain: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 16,
    width: 200,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  rewardTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#5A4634',
    textAlign: 'center',
    marginBottom: 6,
  },
  rewardPoints: {
    fontSize: 13,
    color: '#9E7E63',
    fontWeight: '600',
    textAlign: 'center',
  },
  pointsTagPlain: {
    marginTop: 4,
    backgroundColor: 'rgba(158,126,99,0.1)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 10,
  },
});
