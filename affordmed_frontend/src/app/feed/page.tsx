'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Avatar, CircularProgress, Box, Grid, Button } from '@mui/material';
import ForumIcon from '@mui/icons-material/Forum';
import CommentIcon from '@mui/icons-material/Comment';

interface Post {
  id: number;
  userid: number;
  content: string;
  user_id: string;
  user_name: string;
  comment_count: number;
  created_at?: string;
}

export default function FeedPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8000/posts?type=latest');
        setPosts(response.data);
      } catch (error) {
        setError('Failed to load feed. Please try again later.');
        console.error('Error fetching feed:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeed();
  }, []);

  const totalPosts = posts.length;
  const totalComments = posts.reduce((sum, post) => sum + post.comment_count, 0);

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
              Latest Community Posts
            </Typography>
          </Box>
        </Grid>

        {/* Stats Cards */}
        <Grid item xs={12} md={6}>
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
                <Typography variant="body2" sx={{ color: '#11193399' }}>
                  Showing latest activity
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
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
                <Typography variant="body2" sx={{ color: '#11193399' }}>
                  Across all posts
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

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
                  Recent Activity
                </Typography>
              </Box>

              {loading ? (
                <Box sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 200
                }}>
                  <CircularProgress sx={{ color: '#111933' }} />
                </Box>
              ) : error ? (
                <Box sx={{
                  p: 3,
                  textAlign: 'center',
                  color: '#d32f2f'
                }}>
                  <Typography>{error}</Typography>
                  <Typography variant="body2" sx={{ mt: 1, color: '#11193399' }}>
                    Please verify your configuration and try again.
                  </Typography>
                </Box>
              ) : posts.length === 0 ? (
                <Box sx={{
                  p: 3,
                  textAlign: 'center',
                  color: '#11193399'
                }}>
                  <Typography>No recent posts found</Typography>
                </Box>
              ) : (
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
                              {post.user_name?.charAt(0).toUpperCase() || 'A'}
                            </Avatar>
                            <Box>
                              <Typography variant="h6" sx={{
                                fontWeight: 600,
                                color: '#111933'
                              }}>
                                {post.user_name || 'Anonymous'}
                              </Typography>
                              {post.created_at && (
                                <Typography variant="body2" sx={{ color: '#11193399' }}>
                                  Posted {post.created_at}
                                </Typography>
                              )}
                            </Box>
                          </Box>

                          <Typography variant="body1" sx={{
                            mb: 3,
                            color: '#111933',
                            lineHeight: 1.6
                          }}>
                            {post.content || 'Untitled Post'}
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
                          </Box>
                        </CardContent>
                      </Card>
                    </Box>
                  ))}
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
