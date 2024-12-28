import React from 'react';
import { Grid, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import {
  AwsIcon,
  CentosIcon,
  DockerIcon,
  LinuxIcon,
  NestIcon,
  NextIcon,
  NginxIcon,
  PostgreIcon,
  PythonIcon,
  RailsIcon,
  ReactIcon,
  RubyIcon,
  TsIcon,
} from '@/components/SvgIcon';
import Image from 'next/image';

export const SkillsSection: React.FC = () => (
  <Grid item xs={12} md={4}>
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Typography
        component="h4"
        variant="h4"
        sx={{ paddingBottom: '20px' }}
        style={{
          textDecoration: 'underline',
          textUnderlineOffset: '8px',
          textDecorationThickness: '2px',
        }}
      >
        Skils
      </Typography>
      <TsIcon width={50} height={50} />
      <ReactIcon width={50} height={50} />
      <NestIcon width={50} height={50} />
      <CentosIcon width={50} height={50} />
      <AwsIcon width={50} height={50} />
      <LinuxIcon width={50} height={50} />
      <RubyIcon width={50} height={50} />
      <RailsIcon width={50} height={50} />
      <DockerIcon width={50} height={50} />
      <NginxIcon width={50} height={50} />
      <PythonIcon width={50} height={50} />
      <NextIcon width={50} height={50} />
      <Typography
        component="h4"
        variant="h4"
        sx={{ paddingTop: '20px', paddingBottom: '20px' }}
        style={{
          textDecoration: 'underline',
          textUnderlineOffset: '8px',
          textDecorationThickness: '2px',
        }}
      >
        qualification
      </Typography>
      <Image src="/images/SAA.png" alt="SAAIcon" width={100} height={100} />
    </motion.div>
  </Grid>
);
