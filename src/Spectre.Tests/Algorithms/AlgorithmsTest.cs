﻿using System.Web.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Spectre;
using Spectre.Controllers;
using Spectre.Algorithms;
using MatlabAlgorithmsNative;
using System;
using System.Collections.Generic;

namespace Spectre.Tests.Controllers
{
    [TestClass]
    public class AlgorithmsTest
    {
        Algorithms.Algorithms alg = new Algorithms.Algorithms();

        [TestMethod]
        public void RemoveBaseline()
        {
            double[] mz = new double[] { 1.1, 1.2, 0.97, 1.07, 1.02, 5, 1.2, 1.5, 1.6, 1.2 };
            double[,] data = new double[,] { { 1.1, 1.2, 0.97, 1.07, 1.02, 5, 1.2, 1.5, 1.6, 1.2 }, { 1.1, 1.2, 0.97, 1.07, 1.02, 5, 1.2, 1.5, 1.6, 1.2 }, 
                { 1.1, 1.2, 0.97, 1.07, 1.02, 5, 1.2, 1.5, 1.6, 1.2 }, { 1.1, 1.2, 0.97, 1.07, 1.02, 5, 1.2, 1.5, 1.6, 1.2 } };

            System.Double[,] result = alg.RemoveBaseline(mz, data);

            // Assert
            Assert.IsNotNull(result);
        }

        [TestMethod]
        public void PeakAlignmentFFT()
        {
            double[] mz = new double[] { 1, 1, 1 };
            double[,] data = new double[,] { { 1, 1, 1 }, { 1, 1, 1 }, { 1, 1, 1 } };

            System.Double[,] result = alg.PeakAlignmentFFT(mz, data);

            // Assert
            Assert.IsNotNull(result);
        }

        [TestMethod]
        public void TicNorm()
        {
            double[,] data = new double[,] { { 1.1, 1.2, 0.97, 1.07, 1.02, 5, 1.2, 1.5, 1.6, 1.2 }, { 1.1, 1.2, 0.97, 1.07, 1.02, 5, 1.2, 1.5, 1.6, 1.2 },
                { 1.1, 1.2, 0.97, 1.07, 1.02, 5, 1.2, 1.5, 1.6, 1.2 }, { 1.1, 1.2, 0.97, 1.07, 1.02, 5, 1.2, 1.5, 1.6, 1.2 } };

            System.Double[,] result = alg.TicNorm(data);

            // Assert
            Assert.IsNotNull(result);
        }

        [TestMethod]
        public void EstimateGmm()
        {
            double[] mz = new double[] { 1, 1.1, 1.2 };
            double[,] data = new double[,] { { 1, 1, 1 }, { 1, 1, 1 }, { 1, 1, 1 } };

            object result = alg.EstimateGmm(mz, data, 1, 1);

            Console.WriteLine(result);

            // Assert
            Assert.IsNotNull(result);
        }

        [TestMethod]
        public void ApplyGmm()
        {
            object data = 0;
            double[] mz = new double[5] { 1.1, 1.2, 0.97, 1.07, 1.02 };

            object result = alg.ApplyGmm(mz, data);

            // Assert
            Assert.IsNotNull(result);
        }

        [TestMethod]
        public void Divik()
        {
            double[,] data = new double[,] { { 1, 1, 1 }, { 1, 1, 1 }, { 1, 1, 1 } };
            double[] coordinates = new double[] { 1, 2 };
            Dictionary<string, object> args = new Dictionary<string, object>();
            args.Add("Verbose", false);
            args.Add("UseLevels", false);
            args.Add("OutPath", "ścieżka.txt");

            object[] result = alg.Divik(2, data, coordinates, args);

            // Assert
            Assert.IsNotNull(result);
        }
    }
}
