import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import { motion } from 'framer-motion';

const ProfileSection: React.FC = () => (
  <>
    <Box
      display="flex"
      alignItems="center"
      flexDirection="column"
      sx={{ marginTop: 4, marginBottom: 4 }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Avatar
          alt="Profile Image"
          src="images/character_with_new_background.png"
          sx={{ width: 150, height: 150, marginBottom: 2 }}
        />
      </motion.div>
    </Box>
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Typography
        component="h3"
        variant="h3"
        sx={{ paddingTop: '20px', paddingBottom: '20px' }}
        style={{
          textDecoration: 'underline',
          textUnderlineOffset: '8px',
          textDecorationThickness: '2px',
        }}
      >
        Profile
      </Typography>
    </motion.div>
  </>
);

export default ProfileSection;
