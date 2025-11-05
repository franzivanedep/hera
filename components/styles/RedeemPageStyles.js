import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF7F2',
  },

  // ===== HEADER =====
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
  },
  subText: {
    color: '#F3E9DD',
    fontSize: 16,
    marginTop: 4,
  },
  bellButton: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: 40,
    padding: 10,
  },

  // ===== POINTS CARD =====
  pointsContainer: {
    alignItems: 'center',
    marginTop: -35,
  },
  pointsCard: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 18,
    paddingVertical: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EAE3D9',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  pointsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8B7355',
    marginBottom: 5,
  },
  pointsValue: {
    fontSize: 38,
    fontWeight: '800',
    color: '#4C3C2E',
  },

  // ===== ACTION GRID =====
  actionContainer: {
    backgroundColor: '#FFF9F2',
    borderRadius: 20,
    paddingVertical: 25,
    paddingHorizontal: 20,
    marginHorizontal: 16,
    marginTop: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 3,
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 25,
  },
  actionButton: {
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapper: {
    backgroundColor: '#FCEBE3',
    padding: 18,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  actionText: {
    fontSize: 13,
    color: '#4B3F2F',
    marginTop: 10,
    fontWeight: '500',
    textAlign: 'center',
  },

  // ===== PROMO BANNER =====
  promoContainer: {
    marginTop: 20,
    marginHorizontal: 20,
    borderRadius: 20,
    overflow: 'hidden',
    height: 180,
  },
  promoBanner: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  promoImage: {
    borderRadius: 20,
    resizeMode: 'cover',
  },
  promoOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
  },
  promoContent: {
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  promoTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 6,
    textAlign: 'center',
  },
  promoSubtitle: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: 20,
  },

  // ===== REWARD CARDS =====
  section: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#4C3C2E',
  },
  seeAll: {
    fontSize: 13,
    fontWeight: '600',
    color: '#9E7E63',
  },
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
  modalOverlay: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgba(0,0,0,0.5)",
},
modalContainer: {
  backgroundColor: "#fff",
  borderRadius: 10,
  padding: 20,
  width: "80%",
},
modalTitle: {
  fontSize: 18,
  fontWeight: "bold",
  marginBottom: 10,
},
modalInput: {
  borderWidth: 1,
  borderColor: "#ccc",
  borderRadius: 8,
  padding: 10,
  marginBottom: 15,
},
modalButton: {
  backgroundColor: "#9E7E63",
  padding: 12,
  borderRadius: 8,
  alignItems: "center",
},
modalButtonText: {
  color: "#fff",
  fontWeight: "bold",
},

});
