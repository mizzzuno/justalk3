

import React, { useState, useEffect } from "react";
import { Box, Typography, Paper, Grid, Rating, CircularProgress, Alert } from "@mui/material";

// APIのベースURL
const API_BASE_URL = "https://Justtalk-JusTalk.hf.space";

// APIのキー名を日本語ラベルと最大値にマッピング
const feedbackLabelMapping = {
  conversationLevel: { label: "会話レベル", max: 5 },
  harassmentPresent: { label: "ハラスメントの有無", max: 5 }, // APIが5段階評価を返すことを想定
  harassmentType: { label: "ハラスメントの種類", max: 5 },    // APIが5段階評価を返すことを想定
  repetition: { label: "繰り返しの程度", max: 5 },
  pleasantConversation: { label: "会話の心地よさ", max: 5 },
  blameOrHarassment: { label: "非難またはハラスメントの程度", max: 5 },
};

const Feedback = () => {
  const [feedbackData, setFeedbackData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeedbackData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Flask APIの /analyze エンドポイントを叩く (GETを想定)
        // 必要に応じてPOSTに変更し、bodyに必要な情報を追加してください
        const response = await fetch(`${API_BASE_URL}/analyze`);

        if (!response.ok) {
          const errorText = await response.text(); // 詳細なエラーテキストを取得試行
          throw new Error(`フィードバックデータの取得に失敗しました: ${response.status} ${response.statusText}. ${errorText}`);
        }

        const data = await response.json();

        // APIレスポンスの構造を確認し、必要なデータを取り出す
        // Flaskのコードに基づき、results.deepseek_analysis を想定
        if (data.results && data.results.deepseek_analysis) {
          setFeedbackData(data.results.deepseek_analysis);
        } else {
          // データ構造が予期したものと異なる場合
          console.warn("受信したデータ構造が予期したものと異なります:", data);
          // data.results 自体をフィードバックデータとして試すか、エラーとする
          if(data.results) {
             console.warn("data.results をフィードバックデータとして使用します。");
             setFeedbackData(data.results); // deepseek_analysisがない場合、resultsを直接使う試み
          } else {
             throw new Error("フィードバックデータが見つかりませんでした。");
          }
        }
      } catch (error) {
        console.error("Error fetching feedback data:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeedbackData();
  }, []); // 初回レンダリング時にデータを取得

  // feedbackData を表示用の feedbackItems に変換する
  const getFeedbackItems = () => {
    if (!feedbackData) return [];

    return Object.entries(feedbackData)
      .map(([key, value]) => {
        // valueが数値でない場合やマッピングが存在しない場合はスキップ
        if (typeof value !== 'number' || !feedbackLabelMapping[key]) {
          console.warn(`キー "${key}" のマッピングが存在しないか、値 "${value}" が数値ではありません。スキップします。`);
          return null;
        }
        const { label, max } = feedbackLabelMapping[key];
        return {
          label: label,
          value: value, // APIから取得した値
          max: max,     // 最大値
        };
      })
      .filter(item => item !== null); // nullを除外
  };

  const feedbackItems = getFeedbackItems();

  return (
    <Box sx={{ width: "100%", p: 1 }}>
      <Typography variant="h6" component="h2" sx={{ color: 'white', mb: 1.5, textAlign: 'center' }}>
        会話分析フィードバック
      </Typography>
      <Paper
        elevation={3}
        sx={{ p: 1.5, bgcolor: "transparent", borderRadius: 2 }}
      >
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 150 }}>
            <CircularProgress sx={{ color: 'white' }} />
            <Typography sx={{ ml: 2, color: 'white' }}>フィードバックを読み込み中...</Typography>
          </Box>
        ) : error ? (
          <Alert severity="error" sx={{ bgcolor: '#555', color: 'white' }}>{error}</Alert>
        ) : feedbackItems.length > 0 ? (
          <Grid container spacing={1}>
            {feedbackItems.map((item, index) => (
              <Grid item xs={12} key={index}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    p: 1,
                    bgcolor: "#2a2a2a",
                    borderRadius: 1,
                    "&:hover": {
                      bgcolor: "#333333",
                      transition: "background-color 0.3s",
                    },
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      color: "#ffffff",
                      fontSize: {
                        xs: "0.8rem",
                        sm: "1rem",
                      },
                      flexShrink: 0, // ラベルが縮まないように
                      mr: 1,        // Ratingとの間にマージン
                    }}
                  >
                    {item.label}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Rating
                      value={item.value}
                      max={item.max} // 最大値を設定
                      readOnly
                      size="small"
                      precision={0.5} // 0.5刻みの評価を許容する場合
                      sx={{
                        "& .MuiRating-iconFilled": {
                          color: "#ffd700", // Gold
                        },
                        "& .MuiRating-iconEmpty": {
                          color: "#666666",
                        },
                      }}
                    />
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#ffffff",
                        fontWeight: "bold",
                        minWidth: "40px", // 幅を少し広げる
                        textAlign: 'right', // 右寄せにする
                      }}
                    >
                      {item.value}/{item.max}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography sx={{ color: 'white', textAlign: 'center', p: 2 }}>
            表示できるフィードバックデータがありません。
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default Feedback;
