import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  // ===== CONTAINER =====
  container: {
    flex: 1,
    backgroundColor: '#FAF7F2', // soft neutral beige background
  },

  // ===== HEADER (unchanged) =====
  header: {
    height: 220,
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
    backgroundColor: 'rgba(158, 126, 99, 0.85)',
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
    backgroundColor: '#FFFFFF',
    marginHorizontal: 25,
    marginTop: -35,
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: '#EAE3D9',
  },
  pointsTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pointsLabel: {
    fontSize: 17,
    color: '#8B7355',
    fontWeight: '500',
  },
  pointsValue: {
    fontSize: 42,
    fontWeight: '800',
    color: '#4C3C2E',
    marginVertical: 14,
    letterSpacing: 0.5,
  },
  detailButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#9E7E63',
    paddingVertical: 10,
    paddingHorizontal: 22,
    borderRadius: 16,
  },
  detailButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
    letterSpacing: 0.4,
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
    color: '#4C3C2E',
  },
  seeAll: {
    color: '#9E7E63',
    fontWeight: '600',
    fontSize: 13,
  },

  // ===== REWARD CARDS =====
  rewardCard: {
    borderRadius: 20,
    overflow: 'hidden',
    width: 200,
    height: 150,
    marginRight: 16,
    justifyContent: 'flex-end',
    borderWidth: 1,
    borderColor: '#E5D9CC',
  },
  rewardImage: {
    borderRadius: 20,
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.25)',
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
    backgroundColor: 'rgba(158,126,99,0.9)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
  },

  // ===== PLAIN REWARD CARDS =====
  rewardCardPlain: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 18,
    width: 200,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    borderWidth: 1,
    borderColor: '#EAE3D9',
  },
  rewardTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#4C3C2E',
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
    paddingVertical: 5,
    borderRadius: 10,
  },
});
