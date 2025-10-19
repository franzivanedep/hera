import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F2',
    paddingHorizontal: 20,
    paddingTop: 50,
  },

  // ----- Header -----
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  avatarCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#F2E6D9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    shadowColor: '#9B6B43',
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  userName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#4A2E14',
    letterSpacing: 0.3,
  },
  subText: {
    fontSize: 13,
    color: '#8E735A',
    marginTop: 3,
  },

  // ----- Menu Section -----
  menuSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 6,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E8D6C0',
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  menuLabel: {
    fontSize: 15,
    color: '#4A2E14',
    fontWeight: '500',
  },

  // ----- Footer -----
  footer: {
    alignItems: 'center',
    marginTop: 30,
    paddingBottom: 40,
  },
  footerText: {
    fontSize: 12,
    color: '#A88B73',
    opacity: 0.9,
  },

});
