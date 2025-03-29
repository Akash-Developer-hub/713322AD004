"use client";

import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Avatar, Button, CircularProgress, Grid, Box } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import ForumIcon from '@mui/icons-material/Forum';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import BarChartIcon from '@mui/icons-material/BarChart';


interface Post {
  id: number;
  user_id: number;
  user_name: string;
  content: string;
  comment_count: number;
  like_count: number;
  created_at?: string;
}

const TopPosts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:8000/posts?type=popular");
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        setPosts(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#fefefe'
      }}>
        <CircularProgress sx={{ color: '#111933' }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#fefefe',
        color: '#111933'
      }}>
        <Typography variant="h6">Error: {error}</Typography>
      </Box>
    );
  }

  const totalPosts = posts.length;
  const totalComments = posts.reduce((sum, post) => sum + post.comment_count, 0);
  const totalLikes = posts.reduce((sum, post) => sum + post.like_count, 0);
  const avgEngagement = totalPosts > 0 ? Math.round((totalComments + totalLikes) / totalPosts) : 0;

  return (
    <Box sx={{
      backgroundColor: '#fefefe',
      minHeight: '100vh',
      p: 3
    }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            mb: 4,
            p: 3,
            backgroundColor: 'white',
            borderRadius: 2,
            boxShadow: 1
          }}>
            <ForumIcon sx={{
              fontSize: 40,
              color: '#111933',
              mr: 2
            }} />
            <Typography variant="h4" sx={{
              fontWeight: 600,
              color: '#111933'
            }}>
              Community Engagement Dashboard
            </Typography>
          </Box>
        </Grid>

        {/* Stats Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{
            borderRadius: 2,
            boxShadow: 1,
            height: '100%'
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" sx={{ color: '#11193399' }}>
                  Total Posts
                </Typography>
                <ForumIcon sx={{ color: '#11193380' }} />
              </Box>
              <Typography variant="h3" sx={{
                fontWeight: 700,
                my: 1,
                color: '#111933'
              }}>
                {totalPosts}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TrendingUpIcon sx={{ color: '#4CAF50', mr: 1 }} />
                <Typography variant="body2" sx={{ color: '#11193399' }}>
                  +12% from last week
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{
            borderRadius: 2,
            boxShadow: 1,
            height: '100%'
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" sx={{ color: '#11193399' }}>
                  Total Comments
                </Typography>
                <CommentIcon sx={{ color: '#11193380' }} />
              </Box>
              <Typography variant="h3" sx={{
                fontWeight: 700,
                my: 1,
                color: '#111933'
              }}>
                {totalComments}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TrendingUpIcon sx={{ color: '#4CAF50', mr: 1 }} />
                <Typography variant="body2" sx={{ color: '#11193399' }}>
                  +8% from last week
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{
            borderRadius: 2,
            boxShadow: 1,
            height: '100%'
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" sx={{ color: '#11193399' }}>
                  Total Likes
                </Typography>
                <ThumbUpIcon sx={{ color: '#11193380' }} />
              </Box>
              <Typography variant="h3" sx={{
                fontWeight: 700,
                my: 1,
                color: '#111933'
              }}>
                {totalLikes}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TrendingUpIcon sx={{ color: '#4CAF50', mr: 1 }} />
                <Typography variant="body2" sx={{ color: '#11193399' }}>
                  +15% from last week
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{
            borderRadius: 2,
            boxShadow: 1,
            height: '100%'
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" sx={{ color: '#11193399' }}>
                  Avg Engagement
                </Typography>
                <BarChartIcon sx={{ color: '#11193380' }} />
              </Box>
              <Typography variant="h3" sx={{
                fontWeight: 700,
                my: 1,
                color: '#111933'
              }}>
                {avgEngagement}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TrendingUpIcon sx={{ color: '#4CAF50', mr: 1 }} />
                <Typography variant="body2" sx={{ color: '#11193399' }}>
                  +5% from last week
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Posts List */}
        <Grid item xs={12}>
          <Card sx={{
            borderRadius: 2,
            boxShadow: 1
          }}>
            <CardContent sx={{ p: 0 }}>
              <Box sx={{
                p: 3,
                borderBottom: '1px solid #eee'
              }}>
                <Typography variant="h5" sx={{
                  fontWeight: 600,
                  color: '#111933'
                }}>
                  Top Community Posts
                </Typography>
              </Box>

              <Box sx={{ p: 2 }}>
                {posts.map((post) => (
                  <Box key={post.id} sx={{ mb: 2 }}>
                    <Card sx={{
                      boxShadow: 'none',
                      border: '1px solid #eee',
                      '&:hover': {
                        boxShadow: 1
                      }
                    }}>
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <Avatar
                            sx={{
                              width: 48,
                              height: 48,
                              mr: 2,
                              backgroundColor: '#111933',
                              color: 'white'
                            }}
                          >
                            {post.user_name.charAt(0).toUpperCase()}
                          </Avatar>
                          <Box>
                            <Typography variant="h6" sx={{
                              fontWeight: 600,
                              color: '#111933'
                            }}>
                              {post.user_name}
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#11193399' }}>
                              Posted {post.created_at}
                            </Typography>
                          </Box>
                        </Box>

                        <Typography variant="body1" sx={{
                          mb: 3,
                          color: '#111933',
                          lineHeight: 1.6
                        }}>
                          {post.content}
                        </Typography>

                        <Box sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          pt: 2,
                          borderTop: '1px solid #eee'
                        }}>
                          <Button
                            startIcon={<CommentIcon sx={{ color: '#111933' }} />}
                            size="small"
                            sx={{
                              color: '#111933',
                              textTransform: 'none',
                              '&:hover': {
                                backgroundColor: '#11193310'
                              }
                            }}
                          >
                            {post.comment_count} {post.comment_count === 1 ? 'Comment' : 'Comments'}
                          </Button>
                          <Button
                            startIcon={<ThumbUpIcon sx={{ color: '#111933' }} />}
                            size="small"
                            sx={{
                              color: '#111933',
                              textTransform: 'none',
                              '&:hover': {
                                backgroundColor: '#11193310'
                              }
                            }}
                          >
                            {post.like_count} {post.like_count === 1 ? 'Like' : 'Likes'}
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TopPosts;
